import { Ionicons, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import React, { useRef } from 'react';
import { Text, View, SafeAreaView, ScrollView, Animated, StyleSheet, useWindowDimensions, Image, TouchableOpacity } from 'react-native';


const Homepage =() =>{
    const scrollX = useRef(new Animated.Value(0)).current;
    const { width: windowWidth } = useWindowDimensions();

    const welcome = [
        {
          index: 0,
          image: require("../../assets/images/Avatar.png"),
          title: "Ballon d'or 2023 Winner",
          subtitle: "20,000",
          color: "00:34:12",
        },
        {
          index: 1,
          image: require("../../assets/images/Avatar.png"),
          title: "Ballon d'or 2023 Winner",
          subtitle: "20,000",
          color: "00:34:12",
        }
    ]
    const truncateTitle = (title: any) => {
        const maxLength = 21;
        if (title.length > maxLength) {
          return title.substring(0, maxLength) + '...';
        }
        return title;
      };

      const RecenttruncateTitle = (title: any) => {
        const maxLength = 15;
        if (title.length > maxLength) {
          return title.substring(0, maxLength) + '...';
        }
        return title;
      };

    return(
        <SafeAreaView style={{flex: 1, backgroundColor:'#121212'}}>
            <View style={{flexDirection: 'row', justifyContent:'space-between', paddingVertical: 10, paddingHorizontal: 15}}>
                <View>
                    <Text style={{color:'white', fontSize: 30, fontWeight:'bold'}}>Hello Daniel👋</Text>
                    <Text style={{color:'#AAAAAB', marginTop: 5}}>Good afternoon</Text>
                    </View>
                <View style={{flexDirection:'row', position:'relative'}}>
                    <Ionicons style={{marginRight: 15}} name="md-person-circle" size={40} color="white" />
                    <MaterialCommunityIcons name="bell" size={40} color="white" />
                    <Octicons style={{position:'absolute', right: 5}} name="dot-fill" size={24} color="red" />
                </View>
            </View>

            <ScrollView
            style={{paddingHorizontal: 10, flexGrow: 0}}
          horizontal={true}
        //   pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: scrollX,
                  },
                },
              },
            ],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={1}
        >

            {welcome?.map((each, index)=> {
                return(
            <View key={index} style={{backgroundColor:'#9058EA', paddingVertical: 15, paddingHorizontal: 20, width: 380, marginRight:20, height: 220, borderRadius: 30}}>
                <View style={{flexDirection:'row', justifyContent:'flex-end'}}>
                    <Image source={each?.image} style={{width: 45, height: 45}} />
                </View>
                <Text style={{fontSize: 30, color:'white'}}>{truncateTitle(each?.title)}</Text>
                <Text style={{color:'white', marginTop: 10, fontSize: 20}}>₦{each?.subtitle}</Text>
                <View style={{flexDirection:'row', justifyContent:'flex-end', marginTop: 15}}>
                    <View style={{backgroundColor:'white', padding: 10, borderRadius: 20}}>
                        <Text>{each?.color}</Text>
                    </View>
                </View>
            </View>
            )})}

            {/* <View style={{backgroundColor:'green', width: 300, padding: 10, marginRight: 10}}></View>
            <View style={{backgroundColor:'red', width: 300, padding: 10}}></View> */}

        </ScrollView>

        <View style={{ justifyContent:'center', alignItems:'center' }}>
          <View style={styles.indicatorContainer}>
            {welcome.map((content, contentIndex) => {
              const width = scrollX.interpolate({
                inputRange: [
                  windowWidth * (content.index - 1),
                  windowWidth * content.index,
                  windowWidth * (content.index + 1),
                ],
                outputRange: [8, 30, 8],
                extrapolate: "clamp",
              });
              return (
                <View style={{ paddingTop: 10, marginTop: 20, marginBottom: 30 }} key={content?.index}>
                  <Animated.View style={[styles.normalDot, { width }]} />
                </View>
              );
            })}
          </View>
        </View>
        <View style={{paddingHorizontal: 15, flex: 1}}>
        <View style={{flex: 1, backgroundColor:'#272727', borderRadius: 10, paddingVertical: 20, paddingHorizontal: 15}}>
            <Text style={{color:'white', fontSize: 20}}>Recent Activities</Text>

            <View style={{flex: 1}}>
            <View style={{flexDirection:'row', justifyContent:'space-between', marginTop: 15, alignItems:'center'}}>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Image source={require('../../assets/images/Avatar.png')} style={{width: 60, height: 60, marginRight: 10}} />
                    <View>
                    <Text style={{fontSize: 20, color:'white'}}>{RecenttruncateTitle('Ballondor dor 2023')}</Text>
                    <Text style={{ color:'#9E9E9E'}}>08 May, 01:45</Text>
                    </View>
                </View>
                <View style={{backgroundColor:'black', padding: 10, borderRadius: 20}}>
                    <Text style={{color:'white'}}>Pending</Text>
                </View>
            </View>
            </View>

            <TouchableOpacity style={{padding: 10}}>
                <Text style={{color:'#9058EA', textAlign:'center'}}>See more</Text>
            </TouchableOpacity>
        </View>
        </View>
        </SafeAreaView>
    )
}

const styles= StyleSheet.create({
    normalDot: {
        height: 5,
        width: 8,
        borderRadius: 4,
        backgroundColor: "#9058EA",
        marginHorizontal: 4,
      },
    selectedDot: {
      width: 30, // Width when the view is selected
    },
      indicatorContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
      }
})

export default Homepage