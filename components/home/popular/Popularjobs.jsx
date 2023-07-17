import {useState} from 'react'
import { View, Text , TouchableOpacity,FlatList,ActivityIndicator} from 'react-native'
import { useRouter } from 'expo-router'
import {SIZES,COLORS} from '../../../constants'
import styles from './popularjobs.style'
import PopularJobsCard from '../../common/cards/popular/PopularJobCard'
import { isLoading } from 'expo-font'
import useFetch from '../../../hook/useFetch'

const Popularjobs = () => {
  const router = useRouter();
  const [selectedJob, setSelectedJob] = useState();
  const { data, isLoading, error } =useFetch('search',
  {
    query:'React developer',
    num_pages: 1
  })
  const handleCardPress = (item) => {
    router.push(`/job-details/${item.job_id}`);
    setSelectedJob(item.job_id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <Text style={styles.headerTitle}> Popularjobs</Text>
      <TouchableOpacity>
        <Text style={styles.headerBtn}>Show All</Text>
      </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size='large' colors={COLORS.primary}/>
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          <FlatList
          data={data}
          renderItem={({item})=>(
            
            <PopularJobsCard
            item= {item}
            selectedJob={selectedJob}
            handleCardPress={()=> router.push(`/job-details/${item.job_id}`)}
            />
          )}
          keyExtractor={item => item?.job_id}
          contentContainerStyle={{columnGap: SIZES.medium}}
          horizontal
          />
        )} 
      </View>
    </View>
  )
}

export default Popularjobs