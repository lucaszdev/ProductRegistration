import { styled } from '@modules';
import { colors } from '@theme';
import { Button } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

export const ContainerSafeArea = styled.SafeAreaView`
    flex: 1;
    background-color: ${colors.primary};
`;

export const Container = styled.View`
    flex: 1;
    padding: 20px;
`;

export const FieldContainer = styled.View`
    margin-bottom: 20px;
`;

export const Label = styled.Text`
    color: ${colors.secondary};
    font-weight: 500;
    margin-bottom: 10px;
`;

export const InputField = styled.TextInput`
    border: 1px solid gray;
    height: 40px;
    border-radius: 5px;
    padding-horizontal: 10px;
`;

export const ButtonInput = styled.TouchableOpacity.attrs({
    activeOpacity: 0.7
})`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const ButtonText = styled.Text``;

export const DateContainer = styled.View`
    border: 1px solid gray;
    height: 40px;
    border-radius: 5px;
    padding-horizontal: 10px;
    justify-content: center;
`;

export const MaskInputField = styled(TextInputMask)`
    border: 1px solid gray;
    height: 40px;
    border-radius: 5px;
    padding-horizontal: 10px;
`;

export const SubmitButtonContainer = styled.View`
    margin-top: 20px;
`;

export const SubmitButton = styled(Button)`
    margin-top: 20px;
`;
