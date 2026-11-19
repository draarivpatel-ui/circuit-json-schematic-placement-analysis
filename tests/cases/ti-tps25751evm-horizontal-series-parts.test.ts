import { expect, test } from "bun:test"
import { analyzeSchematicPlacement } from "lib/index"
import {
  createTiTps25751EvmBootstrapCapacitor,
  createTiTps25751EvmVpwrOptionResistor,
} from "../assets/ti-tps25751evm-horizontal-series-parts"
import { createSchematicAnalysisFixtureSvg } from "../fixtures/create-schematic-analysis-fixture-svg"

test("reports TI TPS25751EVM horizontal bootstrap capacitor and VPWR option resistor", async () => {
  for (const { create, name, snapshot } of [
    {
      create: createTiTps25751EvmBootstrapCapacitor,
      name: "C64",
      snapshot: "bootstrap-capacitor",
    },
    {
      create: createTiTps25751EvmVpwrOptionResistor,
      name: "R112",
      snapshot: "vpwr-option-resistor",
    },
  ]) {
    const circuitJson = await create()
    expect(circuitJson.filter((e) => e.type.endsWith("_error"))).toEqual([])
    const analysis = analyzeSchematicPlacement(circuitJson, {
      issueTypes: ["TwoPinComponentShouldBeVertical"],
    })
    // Current behavior: C64 links U10.CBOOT to the SW node and R112 links two
    // supply nodes in series, yet each is told to stand vertically.
    expect(analysis.getIssues()).toMatchObject([
      { schematicBox: { sourceComponentName: name }, railType: "power" },
    ])
    expect(
      createSchematicAnalysisFixtureSvg({
        circuitJson,
        analysis,
        highlightIssues: true,
      }),
    ).toMatchSvgSnapshot(import.meta.path, snapshot)
  }
})
