import { BaseSolver } from "@tscircuit/solver-utils"
import type {
  FuseShouldUseSchematicSymbol,
  SchematicPlacementIssue,
} from "../../types"
import { addAttr } from "../../utils/format"
import { getSchematicBoxComponentIds } from "../../utils/schematic-box-components"
import type { SolverContext } from "../SolverContext"

/** Prefer a dedicated fuse symbol over a generic schematic box. */
export class FuseSymbolSolver extends BaseSolver {
  constructor(
    private readonly params: {
      ctx: SolverContext
      issues: SchematicPlacementIssue[]
    },
  ) {
    super()
  }

  override _step(): void {
    const { ctx, issues } = this.params
    const boxIds = getSchematicBoxComponentIds(ctx.circuitJson)
    const fuseIds = new Set<string>()
    const chipConventionWarningIds = new Set<string>()
    const portCountByComponentId = new Map<string, number>()
    for (const element of ctx.circuitJson) {
      if (
        element.type === "source_component" &&
        element.ftype === "simple_fuse"
      )
        fuseIds.add(element.source_component_id)
      // Surface Core's structured refdes convention warning as style advice.
      // The reference designator does not establish the component's electrical role.
      if (
        element.type === "source_refdes_convention_warning" &&
        element.source_component_ftype === "simple_chip" &&
        element.actual_prefix === "F"
      ) {
        chipConventionWarningIds.add(element.source_component_id)
      }
      if (element.type === "source_port" && element.source_component_id) {
        const id = element.source_component_id
        portCountByComponentId.set(
          id,
          (portCountByComponentId.get(id) ?? 0) + 1,
        )
      }
    }

    for (const placement of ctx.componentPlacements) {
      const { schematicComponentId, sourceComponentId, sourceComponentName } =
        placement
      if (!schematicComponentId || !boxIds.has(schematicComponentId)) continue
      if (!sourceComponentId) continue
      if (
        !fuseIds.has(sourceComponentId) &&
        !(
          chipConventionWarningIds.has(sourceComponentId) &&
          portCountByComponentId.get(sourceComponentId) === 2
        )
      )
        continue
      issues.push({
        lineItemType: "FuseShouldUseSchematicSymbol",
        severity: "warning",
        schematicBox: placement,
        message: `Use a fuse symbol for ${sourceComponentName || "this component"}.`,
      })
    }
    this.solved = true
  }

  static issueToString(issue: FuseShouldUseSchematicSymbol): string {
    const attrs: string[] = []
    addAttr(attrs, "componentName", issue.schematicBox.sourceComponentName)
    addAttr(attrs, "severity", issue.severity)
    addAttr(attrs, "message", issue.message)
    return `<FuseShouldUseSchematicSymbol ${attrs.join(" ")} />`
  }
}
