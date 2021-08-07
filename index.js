const path = require('path'); // this is core so need to initialise first
const express = require('express');
const hbs = require('hbs');
//console.log(__dirname);
//console.log(__filename);
//console.log(path.join(__dirname,'/public'));
const films=require('./utils/films');
const popularlist = require('./utils/popularlist');
const filmdetails = require('./utils/filmdetails');

const app = express();

//set up paths
const pubDirectory = path.join(__dirname,'/public');
//better to use views fold but if you don't want we need to tell express where 
//is our hbs fiiles, if you are using folder name - views no need to do our next line
const viewPath = path.join(__dirname,'/templates/views'); // path.join(__dirname,'/templates');

//creating partials folder for header footer
const partialpath = path.join(__dirname,'/templates/partials');


app.set('view engine', 'hbs'); //setup handlebar engine
app.set('views', viewPath); //setup views location
hbs.registerPartials(partialpath); //registering partial

app.use(express.static(pubDirectory)); //set static directory
const port= 3000;

//1st argument is view second is object to send hbs pages
app.get('', (req,res)=>{
    res.render('index',{
        title: 'weather App',
        name:'Shreya Dhar'
    });
});

app.get('/about', (req,res)=>{
    res.render('about',{
        title: 'weather App',
        name:'Shreya Dhar'
    });
});

app.get('/help', (req,res)=>{
    res.render('help',{
        title: 'weather App',
        name:'Shreya Dhar'
    });
});

// app.get('/search',(req,res)=>{
//     res.render('search')
// });

app.get('/products',(req,res)=>{
    //if no 'search' give error object
    if(!(req.query.search)){
        return res.send({
            error:'You must provide search item'
        })
    }
    else{
        console.log(req.query.search);
        res.send({
            products:[req.query.search]
        })
    }
});

app.get('/weather', (req,res)=>{
    if(!(req.query.address)){
        return res.send({
            error:"You must enter address"
        })
    }
    else{
        if(req.query.address == 'Philadelphia'){
            res.send({
                forecast:'It is snowing',
                location:'Philadelphia'
            })
        }
    }
})

app.get('/search',(req,res)=>{
   //console.log(req.params);
    if(!(req.query.movietitle)){
        res.render('search')
    }
    else{
        films(req.query.movietitle,(error,{latitude}={})=>{
            if (error) {
                return res.send({ error })
            }
            // res.send({
            //     //thik need to stringyfy it
            //     latitude:latitude[0]['movieTitle'],
                
            // })
            res.render('result',{
                latitude: latitude,
                name:'Shreya Dhar'
            });

           // console.log(latitude);
        })

        // res.send({
        //     film:req.params.search
        // })
    }
});

app.get('/popular',(req,res)=>{
    popularlist((error,{listis}={})=>{
        if(error){
            return res.send({error})
        }
        // res.send({
        //     listis:listis['Movies Upcoming']
        // })
        
        // console.log(listis);
        // console.log(listis['Movies Upcoming']);
        // res.render('popularfilms',{
        //     listis:listis['Movies Upcoming']
        // })
        //console.log(imdblist);
        const imdblist = [];
        for(var i = 0;i<listis['Movies Upcoming'].length; i++){
            imdblist[i] = listis['Movies Upcoming'][i]['imdb_id'];
        }
        //console.log(imdblist);
        filmdetails(imdblist,(error,{detailis}={})=>{
            if(error){
                return res.send({error})
            }
            // res.send({
            //     detailis:detailis 
            // })
            res.render('popularfilms',{
                detailis:detailis
        })
       //console.log(detailis);
        })
        

        
    })
})
app.get('*', (req,res)=>{
    res.send("Wrong page bro");
});

app.listen(port,()=>{
    console.log('in 3000');
});