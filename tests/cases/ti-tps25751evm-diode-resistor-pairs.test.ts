import { expect, test } from "bun:test"
import { analyzeSchematicPlacement } from "lib/index"
import {
  createTiTps25751EvmLedBesidePullUps,
  createTiTps25751EvmResetClamp,
} from "../assets/ti-tps25751evm-diode-resistor-pairs"
import { createSchematicAnalysisFixtureSvg } from "../fixtures/create-schematic-analysis-fixture-svg"

test("reports TI TPS25751EVM diode-resistor pairs that share a rail or sit in parallel", async () => {
  for (const { create, diode, resistor, snapshot } of [
    // D3's series resistor is R19; it only shares 730_LDO_3V3 with R13.
    {
      create: createTiTps25751EvmLedBesidePullUps,
      diode: "D3",
      resistor: "R13",
      snapshot: "led-beside-pull-ups",
    },
    // D10 and R85 both connect TIVA_P3V3 and T_RST: a parallel pair.
    {
      create: createTiTps25751EvmResetClamp,
      diode: "D10",
      resistor: "R85",
      snapshot: "reset-clamp",
    },
  ]) {
    const circuitJson = await create()
    expect(circuitJson.filter((e) => e.type.endsWith("_error"))).toEqual([])
    const analysis = analyzeSchematicPlacement(circuitJson, {
      issueTypes: ["DiodeResistorNotAligned"],
    })
    // Current behavior: the drawn wire between them is treated as a series
    // connection and the pair is told to align end to end.
    expect(analysis.getIssues()).toMatchObject([
      {
        diodeSchematicBox: { sourceComponentName: diode },
        resistorSchematicBox: { sourceComponentName: resistor },
      },
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
