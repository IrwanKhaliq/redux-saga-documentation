import React, { useEffect } from 'react';
import type { Node } from 'react';
import { View, Text, StyleSheet } from 'react-native';
// Navigator
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { Provider } from 'react-redux';
import store from './store';

const Home = () => {
  const dispatch = useDispatch()
  const { data } = useSelector(state => state)

  useEffect(() => {
    dispatch({ type: 'CALL_ME_DIRECTLY', payload: '' })
    dispatch({ type: 'CALL_ANOTHER_FUNCTION', payload: '' })
  }, [])

  return (
    <View style={styles.container}>
      <Text>Hi Mate! Welcome to Irwan Syafani's Documentation</Text>
      <Text>We are talking about How to Integrate Redux Saga in React Native 🤩</Text>
      <ScrollView>
        {data && data.map((el, i) => <Text>{el["name"] ? el.name : `user ${i}`}</Text>)}
      </ScrollView>
    </View>
  )
}

const Stack = createStackNavigator();
const App: () => Node = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default App;
