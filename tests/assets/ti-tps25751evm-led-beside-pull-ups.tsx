import { Circuit } from "@tscircuit/core"

// TPS25751EVM, SLVUCP9B Figure 5-1: the 730_LDO_3V3 indicator LED D3 with its
// series resistor R19 and switch Q1, beside the U1 pull-up bank R13-R18 on the
// same rail. Components and positions are copied unchanged from the reference
// schematic in tscircuit/checks; U1 pins leave on net labels.
export async function createTiTps25751EvmLedBesidePullUps() {
  const circuit = new Circuit()
  circuit.pcbDisabled = true
  circuit.add(
    <board schLayout={{ layoutMode: "none" }}>
      <net name="GND" />
      <net name="730_LDO_3V3" />
      <led
        name="D3"
        schX={-23.92183}
        schY={-8.2126}
        color="red"
        pinLabels={{ pin1: ["cathode", "neg"], pin2: ["anode", "pos"] }}
        schRotation={270}
        manufacturerPartNumber="150060RS75000"
      />
      <resistor
        name="R19"
        schX={-23.92183}
        schY={-10.61489}
        resistance="10.0kohm"
        symbolName="resistor"
        schRotation={270}
        manufacturerPartNumber="CRCW040210K0FKED"
      />
      <mosfet
        name="Q1"
        schX={-23.62183}
        schY={-12.81621}
        mosfetMode="enhancement"
        channelType="n"
        symbolGateSide="right"
        symbolSourceSide="bottom"
        symbolDrainSide="top"
        manufacturerPartNumber="CSD15380F3"
      />
      <resistor
        name="R21"
        schX={-21.96204}
        schY={-14.21706}
        resistance="100kohm"
        symbolName="resistor"
        schRotation={270}
        manufacturerPartNumber="RC0201FR-07100KL"
      />
      <resistor
        name="R13"
        schX={-10.36425}
        schY={-8.61285}
        resistance="100kohm"
        symbolName="resistor"
        schRotation={270}
        manufacturerPartNumber="RC0201FR-07100KL"
      />
      <resistor
        name="R14"
        schX={-8.76447}
        schY={-8.61285}
        resistance="100kohm"
        symbolName="resistor"
        schRotation={270}
        manufacturerPartNumber="RC0201FR-07100KL"
      />
      <resistor
        name="R15"
        schX={-7.16466}
        schY={-8.61285}
        resistance="2.20kohm"
        symbolName="resistor"
        schRotation={270}
        manufacturerPartNumber="CRCW02012K20FKED"
      />
      <resistor
        name="R16"
        schX={-5.56485}
        schY={-8.61285}
        resistance="2.20kohm"
        symbolName="resistor"
        schRotation={270}
        manufacturerPartNumber="CRCW02012K20FKED"
      />
      <resistor
        name="R17"
        schX={-3.96504}
        schY={-8.61285}
        resistance="100kohm"
        symbolName="resistor"
        schRotation={270}
        manufacturerPartNumber="RC0201FR-07100KL"
      />
      <resistor
        name="R18"
        schX={-2.36523}
        schY={-8.61285}
        resistance="100kohm"
        symbolName="resistor"
        schRotation={270}
        manufacturerPartNumber="RC0201FR-07100KL"
      />
      <trace from="D3.pin1" to="R19.pin1" />
      <trace from="Q1.source" to="net.GND" />
      <trace from="R21.pin2" to="net.GND" />
      <trace from="Q1.gate" to="net.U1_PIN_6" />
      <trace from="Q1.gate" to="R21.pin1" />
      <trace from="D3.pin2" to={"net.\\37 30_LDO_3V3"} />
      <trace from="R16.pin2" to={"net.\\37 30_LDO_3V3"} />
      <trace from="R15.pin2" to={"net.\\37 30_LDO_3V3"} />
      <trace from="R13.pin2" to={"net.\\37 30_LDO_3V3"} />
      <trace from="R14.pin2" to={"net.\\37 30_LDO_3V3"} />
      <trace from="R17.pin2" to={"net.\\37 30_LDO_3V3"} />
      <trace from="R18.pin2" to={"net.\\37 30_LDO_3V3"} />
      <trace from="R15.pin1" to="net.U1_PIN_8" />
      <trace from="R16.pin1" to="net.U1_PIN_9" />
      <trace from="net.U1_PIN_36" to="R17.pin1" />
      <trace from="net.U1_PIN_27" to="R13.pin1" />
      <trace from="net.U1_PIN_26" to="R14.pin1" />
      <trace from="net.U1_PIN_18" to="R18.pin1" />
      <trace from="Q1.drain" to="R19.pin2" />
    </board>,
  )
  await circuit.renderUntilSettled()
  return circuit.getCircuitJson()
}
