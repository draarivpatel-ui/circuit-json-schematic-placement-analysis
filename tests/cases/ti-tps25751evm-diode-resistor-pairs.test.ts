import { expect, test } from "bun:test"
import { analyzeSchematicPlacement } from "lib/index"
import {
  createTiTps25751EvmLedBesidePullUps,
  createTiTps25751EvmResetClamp,
} from "../assets/ti-tps25751evm-diode-resistor-pairs"
import { createSchematicAnalysisFixtureSvg } from "../fixtures/create-schematic-analysis-fixture-svg"

test("does not treat TI TPS25751EVM rail-sharing or parallel diode-resistor pairs as series", async () => {
  for (const { create, snapshot } of [
    // D3's series resistor is R19; it only shares 730_LDO_3V3 with R13.
    {
      create: createTiTps25751EvmLedBesidePullUps,
      snapshot: "led-beside-pull-ups",
    },
    // D10 and R85 both connect TIVA_P3V3 and T_RST: a parallel pair.
    {
      create: createTiTps25751EvmResetClamp,
      snapshot: "reset-clamp",
    },
  ]) {
    const circuitJson = await create()
    expect(circuitJson.filter((e) => e.type.endsWith("_error"))).toEqual([])
    const analysis = analyzeSchematicPlacement(circuitJson, {
      issueTypes: ["DiodeResistorNotAligned"],
    })
    // A shared rail or a second shared net means the wire between them is not
    // a series link, so there is nothing to align end to end.
    expect(analysis.getIssues()).toEqual([])
    expect(
      createSchematicAnalysisFixtureSvg({
        circuitJson,
        analysis,
        highlightIssues: true,
      }),
    ).toMatchSvgSnapshot(import.meta.path, snapshot)
  }
})
