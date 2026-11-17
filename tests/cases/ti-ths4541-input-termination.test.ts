import { expect, test } from "bun:test"
import { analyzeSchematicPlacement } from "lib/index"
import { createTiThs4541InputTermination } from "../assets/ti-ths4541-input-termination"
import { createSchematicAnalysisFixtureSvg } from "../fixtures/create-schematic-analysis-fixture-svg"
import {
  expectReproNets,
  expectReproRendered,
  getReproSourcePort,
} from "../fixtures/placement-repro-assertions"

test("reproduces a false inverted-rail warning for TI THS4541RGT R26 with ground above the signal", async () => {
  const circuitJson = await createTiThs4541InputTermination()
  expectReproRendered(circuitJson, 6)
  expectReproNets(circuitJson, [
    ["R26.pin2", "R25.pin2", "net.GND"],
    ["R3.pin2", "R26.pin1", "R7.pin1", "net.INPUT_P"],
    ["R4.pin2", "R25.pin1", "R8.pin1", "net.INPUT_N"],
    ["R3.pin1", "net.J1_SIGNAL"],
    ["R4.pin1", "net.J2_SIGNAL"],
    ["R7.pin2", "net.U1_PIN_2"],
    ["R8.pin2", "net.U1_PIN_3"],
  ])
  for (const name of ["R26", "R25"]) {
    const ground = getReproSourcePort(circuitJson, name, "pin2")
    const signal = getReproSourcePort(circuitJson, name, "pin1")
    const groundPort = circuitJson.find(
      (e) =>
        e.type === "schematic_port" &&
        e.source_port_id === ground.source_port_id,
    )
    const signalPort = circuitJson.find(
      (e) =>
        e.type === "schematic_port" &&
        e.source_port_id === signal.source_port_id,
    )
    if (
      groundPort?.type !== "schematic_port" ||
      signalPort?.type !== "schematic_port"
    )
      throw new Error("Missing resistor terminals")
    expect(groundPort.center.y > signalPort.center.y).toBe(name === "R26")
  }
  const analysis = analyzeSchematicPlacement(circuitJson)
  expect(analysis.getIssues()).toMatchObject([
    {
      lineItemType: "TwoPinComponentHasInvertedRails",
      schematicBox: { sourceComponentName: "R26" },
      railType: "ground",
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
