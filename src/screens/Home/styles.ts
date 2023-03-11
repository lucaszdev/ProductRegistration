import { styled } from '@modules';
import { colors } from '@theme';

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${colors.primary};
`;

export const CardItemContainer = styled.View`
    flex-direction: row;
    padding: 16px;
    border: 0.5px solid gray;
    border-radius: 10px;
    margin-horizontal: 16px;
    margin-vertical: 10px;
    justify-content: space-between;
    align-items: center;
`;

export const ProductLabel = styled.Text``;

export const ProductColumn = styled.View``;

export const NoProducts = styled.Text`
    align-self: center;
    margin-top: 15px;
`;

export const HeaderContainer = styled.View`
    flex-direction: row;
    height: 80px;
    justify-content: space-between;
    align-items: center;
    padding-horizontal: 16px;
`;

export const Headercolumn = styled.View``;

export const ViewSwitchers = styled.View`
    flex-direction: row;
`;
