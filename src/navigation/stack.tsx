import { createNativeStackNavigator } from '@modules';
import { HomeScreen, AddProductScreen } from '@screens';
import { Routes } from '@utils/enums';

const Main = createNativeStackNavigator();

const homeOptions = {
    title: 'Product Registration',
};

const addProductsOptions = {
    title: 'Add Products',
}

const MainStackNavigation = () => (
    <Main.Navigator>
        <Main.Screen name={Routes.HOME} component={HomeScreen} options={homeOptions} />
        <Main.Screen name={Routes.ADD_PRODUCTS} component={AddProductScreen} options={addProductsOptions} />
    </Main.Navigator>
)

export default MainStackNavigation;
