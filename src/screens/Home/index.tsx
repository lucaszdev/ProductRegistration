import React, { useEffect, useState } from 'react';
import * as S from './styles';
import { observer, LineChart, Toast, faTrash, FontAwesomeIcon, isEmpty, Button, Dimensions, FlatList, Switch, Text, TouchableOpacity } from '@modules';
import { useNavigation } from '@utils';
import { colors } from '@theme';
import { Routes } from '@utils/enums';
import { formatDateToBR, getProductsFromAsyncStorage, saveProductToAsyncStorage } from '@utils/helpers';

import If from '@components/If';

const Home = () => {
    const navigation = useNavigation();
    const [products, setProducts] = useState<Product[]>([]);

    const [isEnabledBuyDate, setIsEnabledBuyDate] = useState(false);
    const toggleSwitchBuyDate = () => {
        setIsEnabledBuyDate(previousState => !previousState);
        filterByBuyDate();
    };

    const [isEnabledAmount, setIsEnabledAmount] = useState(false);
    const toggleSwitchAmount = () => {
        setIsEnabledAmount(previousState => !previousState);
        filterByAmount();
    };

    navigation.setOptions({
        headerRight: () => (
            <Button
                onPress={() => navigation.navigate(Routes.ADD_PRODUCTS)}
                title="Add"
                color={colors.accentColor}
            />
        ),
    });

    const getProducts = async () => {
        const getProducts: Product[] = await getProductsFromAsyncStorage();

        if (getProducts) setProducts(getProducts.reverse());
    }

    const deleteItem = async (code: number) => {
        try {
            const newArrayProducts = products.filter(prod => prod.code !== code);
            await saveProductToAsyncStorage(newArrayProducts);
            setProducts(newArrayProducts);
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Product removed successfully 😁',
            });
        } catch (error) {
            console.error(error)
        }
    }

    const filterByBuyDate = () => {
        setProducts(products.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    }

    const filterByAmount = () => {
        setProducts(products.sort((a, b) => +b.amount - +a.amount));
    }

    const FilterHeader = () => {
        return (
            <S.HeaderContainer>
                <Text>Filter by</Text>

                <S.ViewSwitchers>
                    <S.Headercolumn style={{ marginRight: 10 }}>
                        <Text>Buy Date</Text>
                        <Switch
                            trackColor={{ false: '#3e3e3e', true: '#43b556' }}
                            ios_backgroundColor="#FFF"
                            onValueChange={() => toggleSwitchBuyDate()}
                            value={isEnabledBuyDate}
                            style={{ marginTop: 5 }}
                        />
                    </S.Headercolumn>

                    <S.Headercolumn>
                        <Text>Amount</Text>
                        <Switch
                            trackColor={{ false: '#3e3e3e', true: '#43b556' }}
                            ios_backgroundColor="#FFF"
                            onValueChange={() => toggleSwitchAmount()}
                            value={isEnabledAmount}
                            style={{ marginTop: 5 }}
                        />
                    </S.Headercolumn>
                </S.ViewSwitchers>
            </S.HeaderContainer>
        )
    }

    const Chart = () => {
        const days: string[] = [];
        const amounts: number[] = [];

        for (let i = 0; i < products.length; i++) {
            const produ = products[i];
            const date = new Date(produ.date);

            days.push(formatDateToBR(date));
            amounts.push(+produ.amount);
        }

        return (
            <LineChart
                data={{
                    labels: days || [],
                    datasets: [
                        {
                            data: amounts || []
                        }
                    ]
                }}
                width={Dimensions.get("window").width - 32} // from react-native
                height={240}
                yAxisLabel="$"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                    backgroundColor: "#FFF",
                    backgroundGradientFrom: "#0077be",
                    backgroundGradientTo: "#00c3ff",
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16,
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                    }
                }}
                bezier
                style={{
                    alignSelf: 'center',
                    marginVertical: 8,
                    borderRadius: 16,
                }}
            />
        )
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getProducts();
        });

        return unsubscribe;
    }, [navigation]);

    const renderItem = ({ item }: { item: Product }) => {
        return (
            <S.CardItemContainer>
                <S.ProductColumn>
                    <S.ProductLabel>Name: {item.name}</S.ProductLabel>
                    <S.ProductLabel>Code: {item.code}</S.ProductLabel>
                    <S.ProductLabel>Date: {formatDateToBR(new Date(item.date))}</S.ProductLabel>
                    <S.ProductLabel>Amount: ${item.amount}</S.ProductLabel>
                </S.ProductColumn>

                <TouchableOpacity
                    onPress={() => deleteItem(item.code)}
                >
                    <FontAwesomeIcon icon={faTrash} color='red' />
                </TouchableOpacity>
            </S.CardItemContainer>
        )
    }

    return (
        <S.Container>
            <If condition={!isEmpty(products)}>
                <FilterHeader />
                <Chart />
            </If>

            <If condition={isEmpty(products)}>
                <S.NoProducts>No product has been registered</S.NoProducts>
            </If>

            <If condition={!isEmpty(products)}>
                <FlatList
                    data={products}
                    keyExtractor={(item: Product) => String(item.code)}
                    renderItem={renderItem}
                    style={{ marginTop: 10 }}
                />
            </If>
        </S.Container>
    )
}

export default observer(Home);
