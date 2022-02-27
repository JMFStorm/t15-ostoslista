import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
  Pressable,
  FlatList,
  View,
} from "react-native";
import { Icon, Input, Header, ListItem } from "react-native-elements";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  const [item, setItem] = React.useState("");
  const [items, setItems] = React.useState([]);

  const historyIndex = React.useRef(0);

  const addItem = React.useCallback(() => {
    if (!item || item.trim() == "") {
      setItem("");
      return;
    }

    const newRow = {
      id: historyIndex.current,
      text: item,
    };

    historyIndex.current += 1;
    setItems((prev) => prev.concat(newRow));
    setItem("");
  }, [historyIndex, item, setItems, setItem]);

  const clearItems = React.useCallback(() => {
    historyIndex.current = 0;
    setItems([]);
  }, [historyIndex, setItems]);

  const renderItem = ({ item }) => {
    return (
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{item.text}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    );
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <Header
        centerComponent={{ text: "SHOPPING LIST", style: { color: "#ffff" } }}
      />
      {/*<TextInput style={styles.input} onChangeText={setItem} value={item} />*/}
      <Input
        placeholder="Type item name"
        label="Item"
        onChangeText={(item) => setItem(item)}
        value={item}
      />
      <View style={styles.buttons}>
        <Pressable
          style={styles.button}
          onPress={addItem}
          title="Add"
          accessibilityLabel="Add"
        >
          <Icon name="add" type="material" color="white" />
          <Text style={styles.text}>Add</Text>
        </Pressable>

        <Pressable
          title="Clear"
          accessibilityLabel="Clear"
          style={styles.button}
          onPress={clearItems}
        >
          <Icon name="clear" type="material" color="white" />
          <Text style={styles.text}>Clear</Text>
        </Pressable>
      </View>
      <View style={{ width: "100%" }}>
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: "80%",
  },
  buttons: {
    marginBottom: 24,
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  button: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#2222cc",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
