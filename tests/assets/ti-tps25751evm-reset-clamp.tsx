import { Circuit } from "@tscircuit/core"

// TPS25751EVM, SLVUCP9B Figure 5-7: the TIVA reset network. R85 and the
// Schottky clamp D10 sit side by side between TIVA_P3V3 and T_RST, with S3 and
// C36 below. Copied from tscircuit/checks with one correction to match TI:
// D10's cathode is on TIVA_P3V3 and its anode on T_RST, triangle pointing up.
export async function createTiTps25751EvmResetClamp() {
  const circuit = new Circuit()
  circuit.pcbDisabled = true
  circuit.add(
    <board schLayout={{ layoutMode: "none" }} schMaxTraceDistance={10}>
      <net name="GND" />
      <net name="TIVA_P3V3" />
      <net name="T_RST" />
      <resistor
        name="R85"
        schX={-7.65867}
        schY={17.70087}
        resistance="1.02kohm"
        symbolName="resistor"
        schRotation={270}
        manufacturerPartNumber="RC0201FR-071K02L"
      />
      <diode
        name="D10"
        schX={-4.09928}
        schY={17.90092}
        variant="schottky"
        pinLabels={{ pin1: ["cathode", "neg"], pin2: ["anode", "pos"] }}
        schRotation={90}
        manufacturerPartNumber="MBR0520LT1G"
      />
      <capacitor
        name="C36"
        schX={-4.09928}
        schY={14.69947}
        capacitance="1uF"
        schRotation={270}
        manufacturerPartNumber="C1005X6S1C105K050BC"
      />
      <pushbutton
        name="S3"
        schX={-7.65867}
        schY={14.50023}
        schRotation={270}
        manufacturerPartNumber="B3U-1000P"
      />
      <trace from="S3.pin2" to="net.GND" />
      <trace from="C36.pin2" to="net.GND" />
      <trace from="S3.pin1" to="net.T_RST" />
      <trace from="R85.pin2" to="net.T_RST" />
      <trace from="C36.pin1" to="net.T_RST" />
      <trace from="D10.pin1" to="net.TIVA_P3V3" />
      <trace from="R85.pin1" to="net.TIVA_P3V3" />
      <trace from="D10.pin2" to="net.T_RST" />
    </board>,
  )
  await circuit.renderUntilSettled()
  return circuit.getCircuitJson()
}
