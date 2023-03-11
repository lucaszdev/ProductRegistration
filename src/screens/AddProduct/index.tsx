import React, { useEffect, useState, useRef } from 'react';
import * as S from './styles';
import { observer, useNavigation, DatePicker, ToastMessage, FontAwesomeIcon, faCalendarDays, isEmpty } from '@modules';
import { formatDate, formatDateToBR, getProductsFromAsyncStorage, saveProductToAsyncStorage } from '@utils/helpers';
import holidayStore from '@stores/holidayStore';
import { colors } from '@theme';
import { Fields } from '@utils/enums';

const AddProduct = () => {
    const navigation = useNavigation();

    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [date, setDate] = useState(new Date());
    const [amount, setAmount] = useState('');
    const [error, setError] = useState<Fields>();
    const [open, setOpen] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);

    const amountRef = useRef<any>(null);

    const handleSubmit = async () => {
        try {
            const verifyItsHoliday = holidayStore.holidays.filter(holiday => holiday.date === formatDate(date));
            const verifyIfTheCodeAlreadyExists = products.filter(prod => +prod.code === +code)

            if (!name) {
                setError(Fields.NAME);
                return ToastMessage.show({
                    type: 'error',
                    text1: 'Name Field Required',
                    text2: "The product need to have a name"
                })
            } else if (!code) {
                setError(Fields.CODE);
                return ToastMessage.show({
                    type: 'error',
                    text1: 'Code Field Required',
                    text2: "The product need to have a code"
                })
            } else if (!isEmpty(verifyIfTheCodeAlreadyExists)) {
                setError(Fields.CODE);
                return ToastMessage.show({
                    type: 'error',
                    text1: 'Code Already exists',
                    text2: "The product need to have a unique code"
                })
            } else if (!isEmpty(verifyItsHoliday)) {
                setError(Fields.DATE);
                return ToastMessage.show({
                    type: 'error',
                    text1: 'Holiday Field Date',
                    text2: "This date is not allowed because it's a holiday"
                })
            } else if (!amount) {
                setError(Fields.AMOUNT);
                return ToastMessage.show({
                    type: 'error',
                    text1: 'Amount Field Required',
                    text2: "The product need to have a amount"
                })
            }

            const newProductsArray = [...products, { name, code, date, amount: amountRef?.current?.getRawValue() }];

            await saveProductToAsyncStorage(newProductsArray);

            navigation.goBack();

            ToastMessage.show({
                type: 'success',
                text1: 'Success',
                text2: 'Product added 😁'
            });
        } catch (error) {
            console.error(error);
        };
    };

    const getProducts = async () => {
        const getProducts = await getProductsFromAsyncStorage();

        if (getProducts) setProducts(getProducts);
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getProducts();
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <>
            <DatePicker
                modal
                open={open}
                date={date}
                mode='date'
                onConfirm={(date) => {
                    setOpen(false)
                    setDate(date)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            />

            <S.ContainerSafeArea>
                <S.Container>
                    <S.FieldContainer>
                        <S.Label>Name</S.Label>
                        <S.InputField
                            value={name}
                            onChangeText={text => setName(text)}
                            placeholder="Add product name"
                            returnKeyType='done'
                            style={{
                                borderColor: error === Fields.NAME ? 'red' : 'gray'
                            }}
                        />
                    </S.FieldContainer>

                    <S.FieldContainer>
                        <S.Label>Code</S.Label>
                        <S.MaskInputField
                            type={'custom'}
                            options={{
                                mask: "9999999999999"
                            }}
                            value={code}
                            onChangeText={(text) => setCode(text)}
                            placeholder="Add the amount of the product"
                            keyboardType='numeric'
                            returnKeyType='done'
                            style={{
                                borderColor: error === Fields.CODE ? 'red' : 'gray'
                            }}
                        />
                    </S.FieldContainer>

                    <S.FieldContainer>
                        <S.Label>Date</S.Label>

                        <S.DateContainer>
                            <S.ButtonInput
                                onPress={() => setOpen(true)}
                                style={{
                                    borderColor: error === Fields.DATE ? 'red' : 'gray'
                                }}
                            >
                                <S.ButtonText>{formatDateToBR(date)}</S.ButtonText>
                                <FontAwesomeIcon icon={faCalendarDays} />
                            </S.ButtonInput>
                        </S.DateContainer>
                    </S.FieldContainer>

                    <S.FieldContainer>
                        <S.Label>Amount</S.Label>
                        <S.MaskInputField
                            type={'money'}
                            options={{
                                precision: 2,
                                separator: ',',
                                delimiter: '.',
                                unit: '$',
                                suffixUnit: ''
                            }}
                            value={amount}
                            onChangeText={(text) => setAmount(text)}
                            placeholder="Add the amount of the product"
                            keyboardType='numeric'
                            returnKeyType='done'

                            style={{
                                borderColor: error === Fields.AMOUNT ? 'red' : 'gray'
                            }}
                            ref={amountRef}
                        />
                    </S.FieldContainer>

                    <S.SubmitButtonContainer>
                        <S.SubmitButton
                            title='Register'
                            color={colors.accentColor}
                            onPress={handleSubmit}
                        />
                    </S.SubmitButtonContainer>
                </S.Container>
            </S.ContainerSafeArea>
        </>
    )
}

export default observer(AddProduct);
