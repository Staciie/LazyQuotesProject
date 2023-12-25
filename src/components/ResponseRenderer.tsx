import React, {useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Line, Response} from '../mlkit_directory';
import colorPallete from '../styles/color';

interface ResponseRendererProps {
  response: Response;
  scale: number;
}

interface BlockProps {
  line: Line;
  scale: number;
}
export const Block = ({line, scale}: BlockProps) => {
  const rect = useMemo(() => {
    return {
      left: line.rect.left * scale,
      top: line.rect.top * scale,
      height: line.rect.height * scale,
      width: line.rect.width * scale,
      transform: [{rotate: `${line.angle}deg`}],
    };
  }, [line, scale]);
  return (
    <View style={[styles.lineView, {...rect}]}>
      <Text
        style={[styles.text, {fontSize: line.size * scale}]}
        selectable={true}
        selectionColor="orange">
        {line.text}
      </Text>
    </View>
  );
};

export const ResponseRenderer = ({response, scale}: ResponseRendererProps) => {
  return (
    <View style={StyleSheet.absoluteFillObject}>
      {response.blocks.map((block) => (
        <Block line={block} scale={scale} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  responseContainer: {
    flex: 1,
  },
  lineView: {
    position: 'absolute',
    backgroundColor: colorPallete.background,
    borderRadius: 5,
  },
  text: {
    color: colorPallete.textPrimary,
  },
});
