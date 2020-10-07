import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  results: {
    flex: 3,
  },
  resultLine: {
    flex: 1,
    borderBottomWidth: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  buttons: {
    flex: 5,
  },
  buttonsLine: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    alignItems: "center",
    borderWidth: 1,
  },
  lastButtonLinesContainer: {
    flex: 2,
    flexDirection: "row",
  },
  twoButtonLines: {
    flex: 3,
  },
  enterButtonContainer: {
    flex: 1,
    alignItems: "center",
    borderWidth: 1,
  },
  calcButton: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    flexDirection: "column",
    borderWidth: 1,
    borderColor: "#b0c4de",
  },
  calcButtonText: {
    fontSize: 20,
  },
});

const CalcButton = (props) => {
  const flex = props.flex ? props.flex : 1;
  return (
    <TouchableOpacity
      style={[styles.calcButton, { flex: flex }]}
      onPress={() => {
        props.btnEvent();
      }}
    >
      <Text style={styles.calcButtonText}>{props.label}</Text>
    </TouchableOpacity>
  );
};

const CalcButtons = (props) => {
  return (
    <>
      {props.buttons.map((button) => {
        return (
          <CalcButton
            key={button.label}
            flex={button.flex}
            label={button.label}
            btnEvent={button.btnEvent}
          />
        );
      })}
    </>
  );
};

const App = () => {
  const buttons = [
    [
      {
        label: "AC",
        flex: 2,
        btnEvent: () => {
          acButton();
        },
      },
      {
        label: "C",
        btnEvent: () => {
          cButton();
        },
      },
      {
        label: "+",
        btnEvent: () => {
          calcButton();
        },
      },
    ],
    [
      {
        label: "7",
        btnEvent: () => {
          valueButton("7");
        },
      },
      {
        label: "8",
        btnEvent: () => {
          valueButton("8");
        },
      },
      {
        label: "9",
        btnEvent: () => {
          valueButton("9");
        },
      },
      {
        label: "-",
        btnEvent: () => {
          calcButton("-");
        },
      },
    ],
    [
      {
        label: "4",
        btnEvent: () => {
          valueButton("4");
        },
      },
      {
        label: "5",
        btnEvent: () => {
          valueButton("5");
        },
      },
      {
        label: "6",
        btnEvent: () => {
          valueButton("6");
        },
      },
      {
        label: "*",
        btnEvent: () => {
          calcButton("*");
        },
      },
    ],
    [
      {
        label: "1",
        btnEvent: () => {
          valueButton("1");
        },
      },
      {
        label: "2",
        btnEvent: () => {
          valueButton("2");
        },
      },
      {
        label: "3",
        btnEvent: () => {
          valueButton("3");
        },
      },
    ],
    [
      {
        label: "0",
        btnEvent: () => {
          valueButton("0");
        },
      },
      {
        label: ".",
        btnEvent: () => {
          valueButton(".");
        },
      },
      {
        label: "/",
        btnEvent: () => {
          calcButton("/");
        },
      },
    ],
    [
      {
        label: "Enter",
        btnEvent: () => {
          enterButton();
        },
      },
    ],
  ];

  const valueButton = (value) => {};

  const enterButton = () => {};

  const calcButton = (value) => {};

  const acButton = () => {};

  const cButton = () => {};

  return (
    <SafeAreaView style={styles.container}>
      {/* 結果を表示するView */}
      <View style={styles.results}>
        <View style={styles.resultLine}></View>
        <View style={styles.resultLine}></View>
        <View style={styles.resultLine}></View>
      </View>

      {/* ボタンを配置するView */}
      <View style={styles.buttons}>
        <View style={styles.buttonsLine}>
          <CalcButtons buttons={buttons[0]} />
        </View>
        <View style={styles.buttonsLine}>
          <CalcButtons buttons={buttons[1]} />
        </View>
        <View style={styles.buttonsLine}>
          <CalcButtons buttons={buttons[2]} />
        </View>
        <View style={styles.lastButtonLinesContainer}>
          <View style={styles.twoButtonLines}>
            <View style={styles.buttonsLine}>
              <CalcButtons buttons={buttons[3]} />
            </View>
            <View style={styles.buttonsLine}>
              <CalcButtons buttons={buttons[4]} />
            </View>
          </View>
          <View style={styles.enterButtonContainer}>
            <CalcButtons buttons={buttons[5]} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default App;
