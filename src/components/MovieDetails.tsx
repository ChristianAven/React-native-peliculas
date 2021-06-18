import React from 'react'
import { FlatList, Text, View } from 'react-native';
import currencyFormatter from 'currency-formatter';
import Icon from 'react-native-vector-icons/Ionicons';


import { MovieFull } from '../interfaces/movieInterface';
import { Cast } from '../interfaces/creditsInterface';
import { CastItem } from './CastItem';

interface Props {
    movieFull: MovieFull;
    cast: Cast[]
}


export const MovieDetails = ({ movieFull, cast }: Props) => {

    const vote = Math.floor(movieFull.vote_average / 2);
    const starless = Array(5 - vote).fill("star-outline");
    const stars = [...Array(vote).fill("star"), ...starless];



    return (
        <>
            {/* Detalles */}
            <View style={{ marginHorizontal: 20 }}>
                <Text>
                    { movieFull.genres.map( g => g.name ).join(', ') }
                </Text>

                <View style={{ flexDirection: 'row' }}>
                    {
                        stars.map((name, index)=>{
                            return(
                                <Icon 
                                    key={index}
                                    name={name}
                                    color="#F4D03F"
                                    size={ 20 }
                                />
                            )    
                                
                        })
                    }

                </View>

                {/* Historia */}
                <Text style={{ fontSize: 23, marginTop: 10, fontWeight: 'bold' }}>
                    Historia
                </Text>

                <Text style={{ fontSize: 16 }}>
                    { movieFull.overview }
                </Text>

                {/* Historia */}
                <Text style={{ fontSize: 23, marginTop: 10, fontWeight: 'bold' }}>
                    Presupuesto
                </Text>
                <Text style={{ fontSize: 18 }}>
                    { currencyFormatter.format( movieFull.budget, { code:'USD' }) }
                </Text>
                

            </View>

            {/* Casting */}
            <View style={{ marginTop: 10, marginBottom: 100   }}>
                <Text style={{ fontSize: 23, marginTop: 10, fontWeight: 'bold', marginHorizontal: 20}}>
                    Actores
                </Text>

                <FlatList 
                    data={ cast }
                    keyExtractor={ (item, index ) => item.id.toString() + index }
                    renderItem={ ({ item }) => <CastItem actor={ item } /> }
                    horizontal={ true }
                    showsHorizontalScrollIndicator={ false }
                    style={{ marginTop: 10, height: 70 }}
                />
                

            </View>

        </>
    )
}
