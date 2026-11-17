import { Circuit } from "@tscircuit/core"
import { Fragment } from "react"

// TPS25751EVM, SLVUCP9B Figure 5-1: R13–R18 below U1, with
// their shared 730_LDO_3V3 rail below them. This is the resistor-bank
// extract; U1 pin numbers identify the connections leaving the extract.
export async function createTiTps25751EvmPullUpBank() {
  const circuit = new Circuit()
  circuit.pcbDisabled = true
  circuit.add(
    <board schLayout={{ layoutMode: "none" }} schMaxTraceDistance={50}>
      <net name="730_LDO_3V3" isPowerNet />
      {[
        { name: "R13", resistance: "100k", pin: 27 },
        { name: "R14", resistance: "100k", pin: 26 },
        { name: "R15", resistance: "2.2k", pin: 8 },
        { name: "R16", resistance: "2.2k", pin: 9 },
        { name: "R17", resistance: "100k", pin: 36 },
        { name: "R18", resistance: "100k", pin: 18 },
      ].map(({ name, resistance, pin }, i) => (
        <Fragment key={name}>
          <resistor
            symbolName="resistor"
            name={name}
            resistance={resistance}
            schX={i * 2.5}
            schY={0}
            schRotation={270}
          />
          <trace from={`.${name} > .pin1`} to={`net.U1_PIN_${pin}`} />
          <trace from={`.${name} > .pin2`} to={"net.\\37 30_LDO_3V3"} />
        </Fragment>
      ))}
    </board>,
  )
  await circuit.renderUntilSettled()
  return circuit.getCircuitJson()
}
