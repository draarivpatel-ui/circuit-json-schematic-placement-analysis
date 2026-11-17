import { expect, test } from "bun:test"
import { analyzeSchematicPlacement } from "lib/index"
import { createTiTps25751EvmPullUpBank } from "../assets/ti-tps25751evm-pull-up-bank"
import { createSchematicAnalysisFixtureSvg } from "../fixtures/create-schematic-analysis-fixture-svg"
import {
  expectReproNets,
  expectReproRendered,
  getReproSourcePort,
} from "../fixtures/placement-repro-assertions"

test("reproduces false inverted-rail warnings for the TI TPS25751EVM pull-up bank", async () => {
  const circuitJson = await createTiTps25751EvmPullUpBank()
  expectReproRendered(circuitJson, 6)
  expectReproNets(circuitJson, [
    [
      "R13.pin2",
      "R14.pin2",
      "R15.pin2",
      "R16.pin2",
      "R17.pin2",
      "R18.pin2",
      "net.730_LDO_3V3",
    ],
    ...[27, 26, 8, 9, 36, 18].map((pin, i) => [
      `R${13 + i}.pin1`,
      `net.U1_PIN_${pin}`,
    ]),
  ])
  for (const name of ["R13", "R14", "R15", "R16", "R17", "R18"]) {
    const supply = getReproSourcePort(circuitJson, name, "pin2")
    const signal = getReproSourcePort(circuitJson, name, "pin1")
    const supplyPort = circuitJson.find(
      (e) =>
        e.type === "schematic_port" &&
        e.source_port_id === supply.source_port_id,
    )
    const signalPort = circuitJson.find(
      (e) =>
        e.type === "schematic_port" &&
        e.source_port_id === signal.source_port_id,
    )
    if (
      supplyPort?.type !== "schematic_port" ||
      signalPort?.type !== "schematic_port"
    )
      throw new Error("Missing resistor terminals")
    expect(supplyPort.center.y).toBeLessThan(signalPort.center.y)
  }
  const analysis = analyzeSchematicPlacement(circuitJson)
  expect(analysis.getIssues()).toMatchObject(
    ["R13", "R14", "R15", "R16", "R17", "R18"].map((name) => ({
      lineItemType: "TwoPinComponentHasInvertedRails",
      schematicBox: { sourceComponentName: name },
      railType: "power",
    })),
  )
  expect(
    createSchematicAnalysisFixtureSvg({
      circuitJson,
      analysis,
      highlightIssues: true,
    }),
  ).toMatchSvgSnapshot(import.meta.path)
})
