<template>
    <div class="weather-top">
    <section class="weather-in">
        <div class="container">
            <div class="weather-image">
                <img :src="image" alt="">
            </div>
            <h1 class="title">
            {{infoUp.data.name}}
            </h1>
            <h2 class="subtitle">
            {{infoUp.data.main.temp}}°
            </h2>
            <div class="columns after-subtitle">
                <div class="column">
                    <p>En Düşük:<strong>{{infoUp.data.main.temp_min}}°</strong></p>
                </div>
                <div class="column">
                    <p>Hissedilen:<strong>{{infoUp.data.main.feels_like}}°</strong></p>
                </div>
                <div class="column">
                    <p>En Yüksek:<strong>{{infoUp.data.main.temp_max}}°</strong></p>  
                </div>
            </div>
            <hr>
            <div class="weather-table-div">               
                <table class="table weather-table is-fullwidth">
                    <thead>
                        <tr>
                            <th>
                                Tarih
                            </th>
                            <th>
                                Sabah
                            </th>
                            <th>
                                Öğlen
                            </th>
                            <th>
                                Akşam
                            </th>
                            <th>
                                Gece
                            </th>
                            <th>
                                Max/Min
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr  v-for="item in infoDown.data.daily" v-bind:key="item.dt">
                            <th>
                                {{item.dt}}
                            </th>
                            <th>
                                {{item.temp.morn}}
                            </th>
                            <th>
                                {{item.temp.day}}
                            </th>
                            <th>
                                {{item.temp.eve}}
                            </th>
                            <th>
                                {{item.temp.night}}
                            </th>
                            <th>
                                {{item.temp.min}}/{{item.temp.max}}
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>     
       </div>
    </section>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name:'weatherDisplayGeneral',
    data:
        function() {
            return {
                infoUp:'',
                infoDown:'',
                

            };
        },
    computed:{
        city(){
            return this.$store.state.cityname;
        },
        image(){
            if(this.infoUp!==''){
                switch (this.infoUp.data.weather[0].main) {
                    case "Clear":
                            return require('@/assets/images/weather-conditions/clearsky.gif');
                       
                    case "Rain":
                            return require('@/assets/images/weather-conditions/rain.gif');
                        
                    case "Drizzle":
                            return require('@/assets/images/weather-conditions/rain.gif');
                       
                    case "Clouds":
                            return require('@/assets/images/weather-conditions/cloudy.gif');
                     
                    case "Snow":
                            return require('@/assets/images/weather-conditions/snow.gif');
                  
                    case "thunderstorm":
                            return require('@/assets/images/weather-conditions/thunderstorm.gif');
                  
                    case "Mist":
                            return require('@/assets/images/weather-conditions/wind.gif');
                
                    default:
                        return require('@/assets/images/loading.gif');
                      
                }
            }
            else{
                return require('@/assets/images/loading.gif')
            }
        }
    },
    watch:{
        'city': function(city) {
            this.makeAPIcall(city)
        }
    },
  
    mounted() {
        
        this.makeAPIcall(this.city);
        
    },

    methods: {
        makeAPIcall(city){
            axios
                .get('https://api.openweathermap.org/data/2.5/weather?q='+city+'&APPID='+process.env.VUE_APP_API_KEY+'&units=metric')
                .then(response=>{
                    this.infoUp=response;
                    var lat = response.data.coord.lat;
                    var lon = response.data.coord.lon;
                    axios.get('https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&exclude=minutely,current,hourly&appid='+process.env.VUE_APP_API_KEY+'&units=metric')
                        .then(response=>{
                            this.infoDown=response;
                            var months = ['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'];
                            this.infoDown.data.daily.forEach(item => {
                                var date = new Date(item.dt*1000);                            
                                item.dt =date.getDate() + "/"+months[date.getMonth()];
                                
                            });
                        })
                        .catch(function(error) {
                            console.log("Error CALLED FOR SECOND CALL "+error);
                        })
                    
                })
                .catch(function(error) {
                    console.log("ERROR CALLED FOR FIRST CALL "+error);
                });
       
        }
    },
    
}
</script>

<style>
    .weather-in{
        background-color: #FFFAE0;
        width: 100%;
    }
    .weather-top{
        width: 100%;
        margin-top: 100px;        
        padding-bottom: 50px;
    }
    .subtitle{
        font-size: 90px;
        text-align: center;
    }
    .title{
        text-align: center;
    }
    .weather-image{
        display: block;
        margin-right: auto;
        margin-left: auto;
        max-width: 300px;
        max-height: 300px;
    }
    .after-subtitle{
        text-align: center;
        font-size: 40px;
        white-space: nowrap;
    }
    .weather-table-div{
        overflow: auto;
        padding-left: 10px;
        padding-right: 30px;
    }
    .weather-table-div thead{
                background-color: #FFCD00;
    }
    .weather-table{
        
    }
</style>