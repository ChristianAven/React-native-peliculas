import React, { useContext, useEffect } from 'react';
import { ActivityIndicator, Dimensions, View, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';
import { MoviePoster } from '../components/MoviePoster';
import { useMovies } from '../hooks/useMovies';
import { HorizontalSlider } from '../components/HorizontalSlider';
import { GradientBackground } from '../components/GradientBackground';
import { getImageColors } from '../helpers/getColores';
import { GradientContext } from '../context/GradientContext';
import { Text } from 'react-native';

const { width: windowWidth } = Dimensions.get('window');

export const HomeScreen = () => {

    const { nowPlaying, popular, topRated, upcoming, isLoading } = useMovies();
    const { top } = useSafeAreaInsets();
    const { setMainColors } = useContext( GradientContext )
   
    const getPosterColors = async( index: number ) => {
        const uri = `https://image.tmdb.org/t/p/w500${ nowPlaying[index].poster_path }`;
        const [ primary = 'Black', secondary = 'grey' ] = await getImageColors( uri );
        setMainColors({ primary, secondary });
    }

    useEffect(() => {
        if( nowPlaying.length > 0 ) {
            getPosterColors(0);
        }
    }, [ nowPlaying ])

    if ( isLoading ) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
                <ActivityIndicator color="blue" size={ 40 } />
            </View>
        )
    }

    return (
        <GradientBackground>
    
            <ScrollView>
                
                <View style={{ marginTop: top + 20 }}>
                    
                    {/* Carosel Principal */}
                   
                    <View style={{ height: 440 }}>
                        <Carousel 
                            data={ nowPlaying }
                            renderItem={ ({ item }: any) => <MoviePoster movie={ item } /> }
                            sliderWidth={ windowWidth }
                            itemWidth={ 300 }
                            inactiveSlideOpacity={0.9}
                            onSnapToItem={ index => getPosterColors( index ) }
                        />
                    </View>

                    {/* Películas populares */}
                    <HorizontalSlider title="Peliculas Populares" movies={ popular } />
                    {/* Peliculas mejores votadas */}
                    <HorizontalSlider title="Las mejores valoradas" movies={ topRated } />
                    {/* Peliculas proximamente */}
                    <HorizontalSlider title="Muy pronto..." movies={ upcoming } />

                </View>
            </ScrollView>
        </GradientBackground>
    )
}
