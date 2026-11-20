import { expect, test } from "bun:test"
import { analyzeSchematicPlacement } from "lib/index"
import { createTiTps25751EvmZeroOhmNameChange } from "../assets/ti-tps25751evm-zero-ohm-name-change"
import { createSchematicAnalysisFixtureSvg } from "../fixtures/create-schematic-analysis-fixture-svg"

test("reports the TI TPS25751EVM 0 ohm GPIO3 rename link as a vertical shunt", async () => {
  const circuitJson = await createTiTps25751EvmZeroOhmNameChange()
  expect(circuitJson.filter((e) => e.type.endsWith("_error"))).toEqual([])
  const analysis = analyzeSchematicPlacement(circuitJson, {
    issueTypes: ["TwoPinComponentShouldBeVertical"],
  })
  // Current behavior: R68 is a 0 ohm link like its five neighbours, but its
  // GPIO3 end shares the TPD_VPWR power net, so it is told to stand up.
  expect(analysis.getIssues()).toMatchObject([
    {
      schematicBox: { sourceComponentName: "R68" },
      railType: "power",
    },
  ])
  expect(
    createSchematicAnalysisFixtureSvg({
      circuitJson,
      analysis,
      highlightIssues: true,
    }),
  ).toMatchSvgSnapshot(import.meta.path)
})
