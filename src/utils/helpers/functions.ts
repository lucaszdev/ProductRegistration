import AsyncStorage from "@react-native-community/async-storage";

export const formatDateToBR = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());

    return `${day}/${month}/${year}`;
}

export const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());

    return `${year}-${month}-${day}`;
}

export const saveProductToAsyncStorage = async (products: any[]) => {
    try {
        await AsyncStorage.setItem('@products', JSON.stringify(products));
    } catch (error) {
        console.log(error);
    }
};

export const getProductsFromAsyncStorage = async () => {
    try {
        const value = await AsyncStorage.getItem('@products');
        if (value !== null) {
            return JSON.parse(value);
        }
    } catch (error) {
        console.log(error);
    }
};
