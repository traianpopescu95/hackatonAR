import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import {
  ViroARScene,
  ViroMaterials,
  ViroARSceneNavigator,
  Viro3DObject,
  ViroAmbientLight,
  ViroCamera
} from '@viro-community/react-viro';

const InitialScene = (props) => {
  const [tvRotation, setTvRotation] = useState([0, 90, 0]);
  const [notebookRotation, setNotebookRotation] = useState([0, 90, 0]);
  const [position, setPosition] = useState([-1, 0, -1]);
  const [tvScale, setTvScale] = useState([0.4, 0.4, 0.4])
  const [notebookScale, setNotebookScale] = useState([0.1, 0.1, 0.1])
  let data = props.sceneNavigator.viroAppProps;

  ViroMaterials.createMaterials({
    notebook: {
      diffuseTexture: require('./assets/Lowpoly_Laptop_1.jpg'),
    }
  })

  ViroMaterials.createMaterials({
    tv: {
      diffuseTexture: require('./assets/tele.jpg'),
    }
  })

  const onMoveObject = (newPosition) => {
    setPosition(newPosition);
  }

  const onRotateTvObject = (rotateState, rotationFactor, source) => {
    if (rotateState === 3) {
      let currentRotation = [tvRotation[0] - rotationFactor, tvRotation[1] - rotationFactor, tvRotation[2] - rotationFactor];
      setTvRotation(currentRotation);
    }
  }

  const onRotateNotebookObject = (rotateState, rotationFactor, source) => {
    if (rotateState === 3) {
      let currentRotation = [notebookRotation[0] - rotationFactor, notebookRotation[1] - rotationFactor, notebookRotation[2] - rotationFactor];
      setNotebookRotation(currentRotation);
    }
  }

  const onResizeTvObject = (pinchState, scaleFactor, source) => {
    if (pinchState === 3) {
      let currentScale = tvScale[0];
      let newScale = currentScale * scaleFactor;
      let newScaleArray = [newScale, newScale, newScale];
      setTvScale(newScaleArray);
    }
  }

  const onResizeNotebookObject = (pinchState, scaleFactor, source) => {
    if (pinchState === 3) {
      let currentScale = notebookScale[0];
      let newScale = currentScale * scaleFactor;
      let newScaleArray = [newScale, newScale, newScale];
      setNotebookScale(newScaleArray);
    }
  }

  return (
    <ViroARScene>
      <ViroCamera position={[-1, 0, 0]} active={true} />
      <ViroAmbientLight color='black' />
      {
        data.object === 'tv' &&
        <Viro3DObject
          source={require('./assets/tele.obj')}
          position={position}
          scale={tvScale}
          rotation={tvRotation}
          materials={["tv"]}
          type="OBJ"
          onDrag={onMoveObject}
          onRotate={onRotateTvObject}
          onPinch={onResizeTvObject}
        />
      }
      {
        data.object === 'notebook' &&
        <Viro3DObject
          source={require('./assets/Lowpoly_Notebook_2.obj')}
          position={position}
          scale={notebookScale}
          rotation={notebookRotation}
          type="OBJ"
          materials={["notebook"]}
          onDrag={onMoveObject}
          onRotate={onRotateNotebookObject}
          onPinch={onResizeNotebookObject}
        />
      }
    </ViroARScene>
  );
};

export default () => {
  const [object, setObject] = useState();

  return (
    <View style={styles.mainView}>
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{
          scene: InitialScene,
        }}
        viroAppProps={{ 'object': object }}
        style={{ flex: 1 }}
      />
      <View style={styles.controlsView}>
        <TouchableOpacity onPress={() => setObject('tv')}>
          <Text style={styles.button}>TV</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setObject('notebook')}>
          <Text style={styles.button}>Notebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

var styles = StyleSheet.create({
  mainView: { flex: 1 },
  controlsView: {
    width: '100%',
    height: 60,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-around'
  },
  button: {
    height: 30,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    margin: 10,
    backgroundColor: 'lightgray'
  }
});
