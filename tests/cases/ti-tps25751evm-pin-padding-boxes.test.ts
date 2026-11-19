import { expect, test } from "bun:test"
import { analyzeSchematicPlacement } from "lib/index"
import { createTiTps25751EvmPinPaddingBoxes } from "../assets/ti-tps25751evm-pin-padding-boxes"
import { createSchematicAnalysisFixtureSvg } from "../fixtures/create-schematic-analysis-fixture-svg"

test("reports pin padding on TI TPS25751EVM boxes whose pins are spaced by pin margins", async () => {
  const circuitJson = await createTiTps25751EvmPinPaddingBoxes()
  expect(circuitJson.filter((e) => e.type.endsWith("_error"))).toEqual([])
  expect(
    circuitJson.filter((e) => e.type === "schematic_component"),
  ).toHaveLength(8)
  const analysis = analyzeSchematicPlacement(circuitJson)
  const issueNames = (type: string) =>
    analysis
      .getIssues()
      .flatMap((issue) =>
        issue.lineItemType === type && "schematicBox" in issue
          ? [issue.schematicBox.sourceComponentName]
          : [],
      )
      .sort()
  // Current behavior: each box has about one drawn pin pitch of padding, but
  // is measured against the nominal 0.2 pin_spacing and reported.
  expect(issueNames("SchematicPinPaddingToEdgeTooLarge")).toEqual([
    "J11",
    "J2",
    "J3",
    "J4",
    "J5",
    "J6",
    "J7",
    "U5",
  ])
  // Legitimate: these boxes are much wider than their labels need.
  expect(issueNames("GenericSchematicBoxTooWide")).toEqual([
    "J2",
    "J3",
    "J4",
    "J5",
    "U5",
  ])
  expect(analysis.getIssues()).toHaveLength(13)
  expect(
    createSchematicAnalysisFixtureSvg({
      circuitJson,
      analysis,
      highlightIssues: true,
    }),
  ).toMatchSvgSnapshot(import.meta.path)
})
