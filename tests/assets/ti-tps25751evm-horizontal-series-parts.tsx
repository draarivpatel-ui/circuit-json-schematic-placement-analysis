import { Circuit } from "@tscircuit/core"

// TPS25751EVM, SLVUCP9B Figure 5-3: the LM76005 bootstrap capacitor C64,
// drawn horizontally between U10.CBOOT and the SW/L7 node. Components,
// positions and pin attributes are copied unchanged from the transcription
// in tscircuit/checks#578; supply and ground pins leave on net labels.
export async function createTiTps25751EvmBootstrapCapacitor() {
  const circuit = new Circuit()
  circuit.pcbDisabled = true
  circuit.add(
    <board schLayout={{ layoutMode: "none" }}>
      <net name="GND" />
      <net name="VSYS" />
      <net name="PP5V" />
      <chip
        name="U10"
        schX={-8.52671}
        schY={-0.42635}
        pinLabels={{
          pin13: "AGND",
          pin14: "AGND",
          pin15: "AGND",
          pin9: "BIAS",
          pin6: "CBOOT",
          pin18: "EN",
          pin12: "FB",
          pin7: "NC",
          pin19: "NC",
          pin23: "NC",
          pin27: "NC",
          pin28: "NC",
          pin29: "NC",
          pin30: "NC",
          pin31: "PAD",
          pin26: "PGND",
          pin24: "PGND",
          pin25: "PGND",
          pin16: "PGOOD",
          pin20: "PVIN",
          pin21: "PVIN",
          pin22: "PVIN",
          pin10: "RT",
          pin11: "SS_TRK",
          pin5: "SW",
          pin1: "SW",
          pin2: "SW",
          pin3: "SW",
          pin4: "SW",
          pin17: "SYNC_MODE",
          pin8: "VCC",
        }}
        schPinArrangement={{
          leftSide: {
            pins: [
              "pin8",
              "pin20",
              "pin21",
              "pin22",
              "pin18",
              "pin16",
              "pin11",
              "pin10",
              "pin17",
              "pin7",
              "pin19",
              "pin23",
              "pin27",
              "pin28",
              "pin29",
              "pin30",
            ],
            direction: "top-to-bottom",
          },
          rightSide: {
            pins: [
              "pin31",
              "pin26",
              "pin25",
              "pin24",
              "pin15",
              "pin14",
              "pin13",
              "pin12",
              "pin9",
              "pin6",
              "pin5",
              "pin4",
              "pin3",
              "pin2",
              "pin1",
            ],
            direction: "bottom-to-top",
          },
        }}
        schPinStyle={{
          pin8: { topMargin: 0 },
          pin20: { topMargin: 0.59897 },
          pin21: { topMargin: 0.19949 },
          pin22: { topMargin: 0.19864 },
          pin18: { topMargin: 0.59898 },
          pin16: { topMargin: 0.59897 },
          pin11: { topMargin: 0.59806 },
          pin10: { topMargin: 0.59897 },
          pin17: { topMargin: 0.59813 },
          pin7: { topMargin: 0.59897 },
          pin19: { topMargin: 0.19949 },
          pin23: { topMargin: 0.19942 },
          pin27: { topMargin: 0.1987 },
          pin28: { topMargin: 0.19943 },
          pin29: { topMargin: 0.19948 },
          pin30: { topMargin: 0.19949, bottomMargin: 7e-5 },
          pin31: { bottomMargin: 0 },
          pin26: { bottomMargin: 0.59898 },
          pin25: { bottomMargin: 0.19948 },
          pin24: { bottomMargin: 0.19943 },
          pin15: { bottomMargin: 0.59812 },
          pin14: { bottomMargin: 0.19949 },
          pin13: { bottomMargin: 0.19949 },
          pin12: { bottomMargin: 0.59812 },
          pin9: { bottomMargin: 1.39788 },
          pin6: { bottomMargin: 0.59813 },
          pin5: { bottomMargin: 0.99846 },
          pin4: { bottomMargin: 0.19864 },
          pin3: { bottomMargin: 0.19949 },
          pin2: { bottomMargin: 0.19948 },
          pin1: { bottomMargin: 0.19949, topMargin: 0.39942 },
        }}
        schWidth={4.79983}
        schHeight={10.38137}
        pinAttributes={{
          pin1: { providesPower: true },
          pin2: { providesPower: true },
          pin3: { providesPower: true },
          pin4: { providesPower: true },
          pin5: { providesPower: true },
          pin6: { requiresPower: true },
          pin7: { doNotConnect: true },
          pin8: { providesPower: true, shouldHaveDecouplingCapacitor: true },
          pin9: { requiresPower: true },
          pin10: { isBidirectional: true },
          pin11: { isBidirectional: true },
          pin12: { isInput: true },
          pin13: { requiresGround: true },
          pin14: { requiresGround: true },
          pin15: { requiresGround: true },
          pin16: {
            isOutput: true,
            canUseOpenDrain: true,
            isUsingOpenDrain: true,
          },
          pin17: { isInput: true },
          pin18: { isInput: true },
          pin19: { isPassive: true },
          pin20: { requiresPower: true, shouldHaveDecouplingCapacitor: true },
          pin21: { requiresPower: true, shouldHaveDecouplingCapacitor: true },
          pin22: { requiresPower: true, shouldHaveDecouplingCapacitor: true },
          pin23: { doNotConnect: true },
          pin24: { requiresGround: true },
          pin25: { requiresGround: true },
          pin26: { requiresGround: true },
          pin27: { isPassive: true },
          pin28: { isPassive: true },
          pin29: { isPassive: true },
          pin30: { isPassive: true },
          pin31: { requiresGround: true },
        }}
        manufacturerPartNumber="LM76005RNPR"
      />
      <inductor
        name="L7"
        schX={-1.72777}
        schY={4.26588}
        inductance="4.7uH"
        schRotation={0}
        manufacturerPartNumber="XAL6060-472MEB"
      />
      <capacitor
        name="C64"
        schX={-4.32723}
        schY={1.17075}
        capacitance="0.47uF"
        schRotation={180}
        manufacturerPartNumber="GRM155R61A474KE15D"
      />
      <trace from="U10.pin7" to="net.GND" />
      <trace from="U10.pin19" to="net.GND" />
      <trace from="U10.pin23" to="net.GND" />
      <trace from="U10.pin27" to="net.GND" />
      <trace from="U10.pin28" to="net.GND" />
      <trace from="U10.pin29" to="net.GND" />
      <trace from="U10.pin30" to="net.GND" />
      <trace from="U10.pin17" to="net.GND" />
      <trace from="U10.pin13" to="net.GND" />
      <trace from="U10.pin14" to="net.GND" />
      <trace from="U10.pin15" to="net.GND" />
      <trace from="U10.pin9" to="net.GND" />
      <trace from="U10.pin31" to="net.GND" />
      <trace from="U10.pin26" to="net.GND" />
      <trace from="U10.pin24" to="net.GND" />
      <trace from="U10.pin25" to="net.GND" />
      <trace from="U10.pin5" to="U10.pin1" />
      <trace from="U10.pin5" to="U10.pin2" />
      <trace from="U10.pin5" to="U10.pin3" />
      <trace from="U10.pin5" to="U10.pin4" />
      <trace from="U10.pin5" to="L7.pin1" />
      <trace from="U10.pin5" to="C64.pin1" />
      <trace from="U10.pin6" to="C64.pin2" />
      <trace from="L7.pin2" to="net.PP5V" />
      <trace from="U10.pin20" to="net.VSYS" />
      <trace from="U10.pin21" to="net.VSYS" />
      <trace from="U10.pin22" to="net.VSYS" />
      <trace from="U10.pin16" to="net.GND" />
    </board>,
  )
  await circuit.renderUntilSettled()
  return circuit.getCircuitJson()
}

// TPS25751EVM, SLVUCP9B Figure 5-5: the do-not-place 0 ohm option R112,
// drawn horizontally between TPD_VPWR and the U12.VPWR node that R111 feeds
// from LDO_3V3. Copied unchanged from tscircuit/checks#578.
export async function createTiTps25751EvmVpwrOptionResistor() {
  const circuit = new Circuit()
  circuit.pcbDisabled = true
  circuit.add(
    <board schLayout={{ layoutMode: "none" }}>
      <net name="GND" />
      <net name="LDO_3V3" />
      <net name="TPD_VPWR" />
      <net name="GPIO3" />
      <chip
        name="U12"
        schX={-6.39012}
        schY={1.57039}
        pinLabels={{
          pin1: "C_SBU1",
          pin2: "C_SBU2",
          pin4: "C_CC1",
          pin5: "C_CC2",
          pin7: "RPD_G1",
          pin6: "RPD_G2",
          pin12: "CC1",
          pin11: "CC2",
          pin15: "SBU1",
          pin14: "SBU2",
          pin9: "FLT",
          pin21: "Thermal_Pad",
          pin3: "VBIAS",
          pin10: "VPWR",
          pin16: "NC",
          pin17: "NC",
          pin19: "NC",
          pin20: "NC",
          pin8: "GND",
          pin13: "GND",
          pin18: "GND",
        }}
        schPinArrangement={{
          leftSide: {
            pins: [
              "pin10",
              "pin3",
              "pin16",
              "pin12",
              "pin11",
              "pin15",
              "pin14",
              "pin9",
            ],
            direction: "top-to-bottom",
          },
          rightSide: {
            pins: [
              "pin21",
              "pin18",
              "pin13",
              "pin8",
              "pin2",
              "pin1",
              "pin6",
              "pin5",
              "pin7",
              "pin4",
              "pin17",
              "pin19",
              "pin20",
            ],
            direction: "bottom-to-top",
          },
        }}
        schPinStyle={{
          pin10: { topMargin: 0.40107 },
          pin3: { topMargin: 0.20012 },
          pin16: { topMargin: 1.00041 },
          pin12: { topMargin: 1.00036 },
          pin11: { topMargin: 1.00041 },
          pin15: { topMargin: 1.00042 },
          pin14: { topMargin: 0.20012 },
          pin9: { topMargin: 2.20077, bottomMargin: 0 },
          pin21: { bottomMargin: 0 },
          pin18: { bottomMargin: 0.20012 },
          pin13: { bottomMargin: 0.20018 },
          pin8: { bottomMargin: 0.20012 },
          pin2: { bottomMargin: 1.00035 },
          pin1: { bottomMargin: 0.20012 },
          pin6: { bottomMargin: 0.6003 },
          pin5: { bottomMargin: 0.20012 },
          pin7: { bottomMargin: 0.60023 },
          pin4: { bottomMargin: 0.20018 },
          pin17: { bottomMargin: 1.00036 },
          pin19: { bottomMargin: 0.60029 },
          pin20: { bottomMargin: 0.60024, topMargin: 0.40107 },
        }}
        schWidth={6.79947}
        schHeight={9.20297}
        pinAttributes={{
          pin1: { isBidirectional: true },
          pin2: { isBidirectional: true },
          pin3: { isPassive: true },
          pin4: { isBidirectional: true },
          pin5: { isBidirectional: true },
          pin6: { isPassive: true },
          pin7: { isPassive: true },
          pin8: { requiresGround: true },
          pin9: {
            isOutput: true,
            canUseOpenDrain: true,
            isUsingOpenDrain: true,
          },
          pin10: { requiresPower: true, shouldHaveDecouplingCapacitor: true },
          pin11: { isBidirectional: true },
          pin12: { isBidirectional: true },
          pin13: { requiresGround: true },
          pin14: { isBidirectional: true },
          pin15: { isBidirectional: true },
          pin16: { isPassive: true },
          pin17: { isPassive: true },
          pin18: { requiresGround: true },
          pin19: { isPassive: true },
          pin20: { isPassive: true },
          pin21: { requiresGround: true },
        }}
        manufacturerPartNumber="TPD4S201RUKR"
      />
      <resistor
        name="R111"
        schX={-14.18938}
        schY={8.57244}
        resistance="0ohm"
        symbolName="resistor"
        schRotation={90}
        manufacturerPartNumber="CRCW04020000Z0ED"
      />
      <resistor
        name="R112"
        schX={-14.98941}
        schY={7.37217}
        resistance="0ohm"
        symbolName="resistor"
        schRotation={0}
        doNotPlace
      />
      <capacitor
        name="C68"
        schX={-14.18962}
        schY={6.37169}
        capacitance="1uF"
        schRotation={270}
        manufacturerPartNumber="GRM155R6YA105KE11D"
      />
      <trace from="U12.pin21" to="net.GND" />
      <trace from="U12.pin8" to="net.GND" />
      <trace from="U12.pin13" to="net.GND" />
      <trace from="U12.pin18" to="net.GND" />
      <trace from="C68.pin2" to="net.GND" />
      <trace from="U12.pin10" to="C68.pin1" />
      <trace from="U12.pin10" to="R111.pin1" />
      <trace from="U12.pin10" to="R112.pin2" />
      <trace from="R111.pin2" to="net.LDO_3V3" />
      <trace from="R112.pin1" to="net.GPIO3" />
      <trace from="R112.pin1" to="net.TPD_VPWR" />
    </board>,
  )
  await circuit.renderUntilSettled()
  return circuit.getCircuitJson()
}
