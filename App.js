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
    paddingRight: 20,
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

  const [results, setResults] = React.useState([]);
  const [current, setCurrent] = React.useState("0");
  const [dotInputed, setDotInputed] = React.useState(false);
  const [afterValueButton, setAfterValueButton] = React.useState(false);

  const valueButton = (value) => {
    let currentString = current;
    let newDotInputed = dotInputed;

    if (value == ".") {
      // 「.」は2回入力できないようにする
      if (!dotInputed) {
        currentString = currentString + value;
        newDotInputed = true;
      }
    } else if (currentString == "0") {
      currentString = value;
    } else {
      currentString = currentString + value;
    }

    setCurrent(currentString);
    setDotInputed(newDotInputed);
    setAfterValueButton(true);
  };

  const enterButton = () => {
    let newValue = NaN;

    if (dotInputed) {
      newValue = parseFloat(current);
    } else {
      newValue = parseInt(current);
    }

    if (isNaN(newValue)) {
      return;
    }

    setCurrent("0");
    setDotInputed(false);
    setResults([...results, newValue]);
    setAfterValueButton(false);
  };

  const calcButton = (value) => {
    if (results.length < 2) {
      return;
    }

    if (afterValueButton) {
      return;
    }

    const target2 = results.pop();
    const target1 = results.pop();
    let newValue = null;

    switch (value) {
      case "+":
        newValue = target1 + target2;
        break;
      case "-":
        newValue = target1 - target2;
        break;
      case "*":
        newValue = target1 * target2;
        break;
      case "/":
        newValue = target1 / target2;
        if (!isFinite(newValue)) {
          newValue = null;
        }
        break;
      default:
        break;
    }

    if (newValue == null) {
      return;
    }

    setCurrent("0");
    setDotInputed(false);
    setResults([...results, newValue]);
    setAfterValueButton(false);
  };

  const acButton = () => {
    setCurrent("0");
    setDotInputed(false);
    setResults([]);
    setAfterValueButton(false);
  };

  const cButton = () => {
    setCurrent("0");
    setDotInputed(false);
    setAfterValueButton(false);
  };

  const showValue = (index) => {
    if (afterValueButton || results.length == 0) {
      index = index - 1;
    }

    if (index == -1) {
      return current;
    }

    if (results.length > index) {
      return results[results.length - 1 - index];
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 結果を表示するView */}
      <View style={styles.results}>
        <View style={styles.resultLine}>
          <Text>{showValue(2)}</Text>
        </View>
        <View style={styles.resultLine}>
          <Text>{showValue(1)}</Text>
        </View>
        <View style={styles.resultLine}>
          <Text>{showValue(0)}</Text>
        </View>
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
