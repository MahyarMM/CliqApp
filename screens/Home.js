/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    Modal,
    LogBox,
} from 'react-native';
import {
    Svg,
    Polygon,
} from 'react-native-svg';
import { Alert } from 'react-native';
import { BlurView } from '@react-native-community/blur';

import { images, icons, COLORS, FONTS, SIZES } from '../constants';
import { ScrollView } from 'react-native-gesture-handler';
import { color } from 'react-native-reanimated';

const Home = ({ navigation }) => {

    const [showAddToBagModal, setShowAddToBagModal] = React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState(null);
    const [selectedSize, setSelectedSize] = React.useState('');


    // Dummy Data
    const [trending, setTrending] = React.useState([
        {
            id: 0,
            name: 'Nike Air Zoom Pegasus 36',
            img: images.nikePegasus36,
            bgColor: '#BF012C',
            type: 'RUNNING',
            price: '$1860',
            sizes: [6, 7, 8, 9, 10],
        },
        {
            id: 1,
            name: 'Nike Metcon 5',
            img: images.nikeMetcon5Black,
            bgColor: '#D39C67',
            type: 'TRAINING',
            price: '$1350',
            sizes: [6, 7, 8, 9, 10, 11, 12],
        },
        {
            id: 2,
            name: 'Nike Air Zoom Kobe 1 Proto',
            img: images.nikeZoomKobe1Proto,
            bgColor: '#7052A0',
            type: 'BASKETBALL',
            price: '$1990',
            sizes: [6, 7, 8, 9],
        },
        {
            id: 3,
            name: 'Nike Air Zoom Kobe 1 Proto',
            img: images.nikeZoomKobe1Proto,
            bgColor: '#7052A0',
            type: 'CRICKET',
            price: '$1990',
            sizes: [6, 7, 8, 9],
        },
        {
            id: 4,
            name: 'Nike Air Zoom Pegasus 36',
            img: images.nikePegasus36,
            bgColor: '#BF012C',
            type: 'RUNNING',
            price: '$1860',
            sizes: [6, 7, 8, 9, 10],
        },
        {
            id: 5,
            name: 'Nike Metcon 5',
            img: images.nikeMetcon5Black,
            bgColor: '#D39C67',
            type: 'TRAINING',
            price: '$1350',
            sizes: [6, 7, 8, 9, 10, 11, 12],
        },
        {
            id: 6,
            name: 'Nike Air Zoom Kobe 1 Proto',
            img: images.nikeZoomKobe1Proto,
            bgColor: '#7052A0',
            type: 'BASKETBALL',
            price: '$1990',
            sizes: [6, 7, 8, 9],
        },
        {
            id: 7,
            name: 'Nike Air Zoom Kobe 1 Proto',
            img: images.nikeZoomKobe1Proto,
            bgColor: '#7052A0',
            type: 'CRICKET',
            price: '$1990',
            sizes: [6, 7, 8, 9],
        },
    ]);

    const [trending_clothes, setTrendingClothes] = React.useState([]);
    const [recentlyViewed, setRecentlyViewed] = React.useState([]);

    // Render
    async function fetchClothesList(){
        var settings = {
            'method': 'GET',
            'headers': {
              'cache-control': 'no-cache',
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
          };
        const response = await fetch('https://api.npoint.io/968ab3964e88978f2d51',settings)
        .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
        setTrendingClothes(response);
        console.log('data',JSON.stringify(response));
    }

    useEffect(() => {
        if (trending_clothes.length <= 1) {fetchClothesList();}

    });


    async function fetchAvailClothesList(){
        var settings = {
            'method': 'GET',
            'headers': {
              'cache-control': 'no-cache',
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
          };
        const response = await fetch('https://api.npoint.io/68cb83657d7616957c3f',settings)
        .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
        setRecentlyViewed(response);
        console.log('all-data',JSON.stringify(response));
    }

    useEffect(() => {
        if (recentlyViewed.length <= 1)
            {fetchAvailClothesList();}
    });

    function renderTrendingShoes(item, index) {
        var trendingStyle = {};

        if (index == 0) {
            trendingStyle = { marginLeft: SIZES.padding };
        } else {
            trendingStyle = {};
        }

        if (item.price.toString().includes('$'))
            {item.price = Math.round(item.price.replace('$',''));}
        else if (!item.price.toString().includes('₹'))
            {item.price = '₹' + item.price;}

        return (
            <TouchableOpacity
                style={{ height: 240, width: 180, justifyContent: 'center', marginHorizontal: SIZES.base, ...trendingStyle }}
                onPress={() => {
                    setSelectedItem(item);
                    setShowAddToBagModal(true);
                }}
            >
                <Text style={{ color: COLORS.gray, ...FONTS.h5 }}>{item.type}</Text>

                <View style={[{
                    flex: 1,
                    justifyContent: 'flex-end',
                    marginTop: SIZES.base,
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    marginRight: SIZES.padding,
                    paddingLeft: SIZES.radius,
                    paddingRight: SIZES.padding,
                    paddingBottom: SIZES.radius,
                    backgroundColor: item.bgColor,
                }, styles.trendingShadow]}>
                    <View style={{ height: '35%', justifyContent: 'space-between' }}>
                        <Text style={{ color: COLORS.white, ...FONTS.prod_list_title_text }}>{item.name}</Text>
                        <Text style={{ color: COLORS.white, ...FONTS.prod_list_price_text }}>{item.price}</Text>
                    </View>
                </View>

                <View style={{ position: 'absolute', top: 27, right: 0, width: '95%', height: '100%' }}>
                    <Svg height="100%" width="100%">
                        <Polygon
                            points="0,0 160,0 160,80"
                            fill="white"
                        />
                    </Svg>
                </View>

                <Image
                    source={item.img}
                    resizeMode="cover"
                    style={{
                        position: 'absolute',
                        elevation:10,
                        top: 50,
                        right: 0,
                        width: '98%',
                        height: 80,
                        transform: [
                            { rotate: '-15deg' },
                        ],
                    }}
                />
            </TouchableOpacity>
        );
    }

    function renderLatestClothesTrendingItems(item, index) {
        var trendingStyle = {};

        if (index == 0) {
            trendingStyle = { marginLeft: SIZES.padding };
        } else {
            trendingStyle = {};
        }

        return (
            <TouchableOpacity
                style={{ height: 320, width: 180, padding:2,
                }}
                onPress={() => {
                    // setSelectedItem(item)
                    // setShowAddToBagModal(true)
                    navigation.navigate('Product',{
                        id: item.id,
                        name: item.name,
                        img: item.img,
                        type: item.type,
                        price:item.price,
                    });
                }}
            >

                <View style={{ height:260,width:'100%',padding:8,
                alignItems:'flex-start', display:'flex', flexDirection:'column', justifyContent:'flex-start'}}>
                    <Image
                        source={{uri:item.img}}
                        resizeMode="contain"
                        style={{
                            flex:3,
                            width: '100%',
                            borderRadius:8,
                            height: 200,

                        }}
                    />
                    <Text style={{ flex:1,color: COLORS.black, ...FONTS.prod_list_price_text }}>{item.name}</Text>


                </View>
            </TouchableOpacity>
        );
    }
    function FlatListItemSeparator(){
        return (
          <View
            style={{
              height: 0.5,
              width: '100%',
              backgroundColor: COLORS.lightGray,
            }}
          />
        );
    }
    function renderRecentlyViewed(item, index) {
        if (item.price.toString().includes('$'))
            {item.price = Math.round(item.price.replace('$',''));}
        else if (!item.price.toString().includes('₹'))
            {item.price = '₹' + item.price;}

        return (
            <TouchableOpacity
                style={{ flex: 1, flexDirection: 'row' }}
                onPress={() => {
                    navigation.navigate('Product',{
                        id: item.id,
                        name: item.name,
                        img: item.img,
                        type: item.type,
                        price:item.price,
                    });
                }}
            >
                <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' , padding:4,
                    ...FONTS.box_shadow}}>
                    <Image
                        source={{uri:item.img}}
                        resizeMode="contain"
                        style={{
                            borderRadius:10,
                            width: 110,
                            height: 120,
                            margin:1,

                        }}
                    />
                </View>
                <View style={{ flex: 3, marginLeft: SIZES.radius, justifyContent: 'center' }}>
                    <Text style={{ color: COLORS.black, ...FONTS.product_title_text }}>{item.name}</Text>
                    <Text style={{ ...FONTS.prod_list_price_text }}>{item.price}</Text>
                    <Text style={{ ...FONTS.prod_list_offer_title_text }}> 30% Off</Text>
                </View>
            </TouchableOpacity>
        );
    }

    function renderShoeSizes() {
        return (
            selectedItem.sizes.map((item, index) => {
                return (
                    <TouchableOpacity
                        key={index}
                        style={{
                            width: 35,
                            height: 25,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginHorizontal: 5,
                            marginBottom: 10,
                            backgroundColor: selectedItem.sizes[index] == selectedSize ? COLORS.white : null,
                            borderWidth: 1,
                            borderColor: COLORS.white,
                            borderRadius: 5,
                        }}
                        onPress={() => {
                            setSelectedSize(item);
                        }}
                    >
                        <Text style={{ color: selectedItem.sizes[index] == selectedSize ? COLORS.black : COLORS.white, ...FONTS.body4 }}>{item}</Text>
                    </TouchableOpacity>
                );
            })
        );
    }

    return (
            <View>
                <ScrollView>
                <View style={styles.container}>
                    {/* <Text style={{ marginTop: SIZES.radius, marginHorizontal: SIZES.padding, ...FONTS.largeTitleBold }}>TRENDING</Text> */}

                <View style={{ height: 260, marginTop: 5, backgroundColor:COLORS.white }}>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={trending}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item, index }) => renderTrendingShoes(item, index)}
                    />
                </View>

                <View style={{ height: 260, marginTop: 2, backgroundColor:COLORS.light1 }}>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={trending_clothes}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item, index }) => renderLatestClothesTrendingItems(item, index)}
                    />
                </View>

                <View
                    style={[{
                        flex: 1,
                        flexDirection: 'row',
                        marginTop: SIZES.padding,
                        borderTopLeftRadius: 40,
                        borderTopRightRadius: 40,
                        backgroundColor: COLORS.white,
                    }, styles.recentContainerShadow]}
                >
                {/* <View style={{ width: 70, marginLeft: SIZES.base }}>
                    <Image
                        source={images.recentlyViewedLabel}
                        resizeMode="contain"
                        style={{
                            width: "100%",
                            height: "100%",
                        }}
                    />
                </View> */}
                <View style={{ flex: 1, paddingBottom: SIZES.padding }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={recentlyViewed}
                        keyExtractor={item => item.id.toString()}
                        ItemSeparatorComponent = { FlatListItemSeparator }
                        renderItem={({ item, index }) => renderRecentlyViewed(item, index)}
                    />
                </View>
            </View>


                </View>

            </ScrollView>
            <View style={{  ...FONTS.home_menu_box_shadow,height:60,
                            display:'flex',position:'absolute',
                            padding:10,width:'100%',
                            bottom:0, backgroundColor: COLORS.white,
                            flexDirection:'row', justifyContent:'space-between' }}>

                <TouchableOpacity
                        onPress={() => {
                        }}
                        >
                        <View style={{flexDirection:'column', alignItems:'center'}}>
                            <Image source={icons.home_btm_menu} resizeMode = "contain" style={{height:24,width:24}} />
                            <Text style={{color:COLORS.black, ...FONTS.home_btm_text}}> Home</Text>
                        </View>
                </TouchableOpacity>

                <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Category',{});
                        }}
                        >
                        <View style={{flexDirection:'column', alignItems:'center'}}>
                            <Image source={icons.cat_btm_menu} resizeMode = "contain" style={{height:24,width:24}} />
                            <Text style={{color:COLORS.black, ...FONTS.home_btm_text}}> Categories</Text>
                        </View>
                </TouchableOpacity>



                <View style={{flexDirection:'column', alignItems:'center'}}>
                    <Image source={icons.brand_btm_menu} resizeMode = "contain" style={{height:24,width:24}} />
                    <Text style={{color:COLORS.black, ...FONTS.home_btm_text}}> Brand</Text>
                </View>
                <View style={{flexDirection:'column', alignItems:'center'}}>
                    <Image source={icons.account_btm_menu} resizeMode = "contain" style={{height:24,width:24}} />
                    <Text style={{color:COLORS.black, ...FONTS.home_btm_text}}> Account</Text>
                </View>
                <View style={{flexDirection:'column', alignItems:'center'}}>
                    <Image source={icons.bag_btm_menu} resizeMode = "contain" style={{height:24,width:24}} />
                    <Text style={{color:COLORS.black, ...FONTS.home_btm_text}}> My Bag</Text>
                </View>

            </View>
            </View>
        );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        marginBottom:40,
    },
    trendingShadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    },
    recentContainerShadow: {
        shadowColor: '#f2f2f2',
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,

        elevation: 25,
    },
    absolute: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
});

export default Home;
