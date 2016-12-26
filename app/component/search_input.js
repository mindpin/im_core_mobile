import React from 'react';
import {
  TextInput,
  View,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#0003",
    height: 55,
    padding: 10,
  },
  text_input: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
  }
});

class SearchInput extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <View style={styles.root}>
        <TextInput
          style={styles.text_input}
          placeholder="搜索"
        />
      </View>
    );
  }

};

export default SearchInput;
