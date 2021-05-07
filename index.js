const {get} = require('axios');
const {readFile} = require('fs');
const cheerio = require('cheerio');

const finalData = {hospitals:[], plasma:[], oxygen:[]};

get('https://vasaicoronaresources.net/dashboard/').then(({data})=>{
    const $ = cheerio.load(data);

    $('#MI6 > tbody > tr').each(function() {
        const elem = $(this);
        const hospital = {
            hospitalName: elem.find('td[data-input="hospitalnameinput"]').text().trim(),
            locality: elem.find('td[data-input="localityinput"]').text().trim(),
            isolationBed: elem.find('td[data-input="filterisobedinput"]').text().trim(),
            oxygenBed: elem.find('td[data-input="filteroxybedinput"]').text().trim(),
            icuBed: elem.find('td[data-input="filtericubedinput"]').text().trim(),
            ventilatorBed: elem.find('td[data-input="filterventibedinput"]').text().trim(),
            contact: elem.find('td[data-input="contactnoinput"]').text().trim(),
            address: elem.find('td[data-input="addressinput"] > a').attr("href"),
            ambulanceContact: elem.find('td[data-input="ambulancecontactnoinput"]').text().trim(),
            updatedAt: elem.find('td[data-input="lastupdateinput"]').text().trim()
        };

        finalData.hospitals.push(hospital);
        
    });


    $('#MI7 > tbody > tr').each(function() {
        const elem = $(this);
        const oxygen = {
            supplier: elem.find('td[data-input="suppliernameinput"]').text().trim(),
            locality: elem.find('td[data-input="localityinputoxygen"]').text().trim(),
            inStock: elem.find('td[data-input="oxygenavailablityinput"]').text().trim(),
            contact: elem.find('td[data-input="contactnooxygeninput"]').text().trim(),
            address: elem.find('td[data-input="addressoxygeninput"]').text().trim(),
            updatedAt: elem.find('td[data-input="lastupdateoxygeninput"]').text().trim(),
        };

        finalData.oxygen.push(oxygen);

    });
}).catch(e=>console.log(e));


readFile('./index.html', 'utf-8', (err, data)=>{
    if(err)return 0;
    const $ = cheerio.load(data);
    $('#MI8 tr').each(function() {
        const elem = $(this);
        const plasma = {
            donor: elem.find('td[data-input="donornameinput"]').text().trim(),
            gender: elem.find('td[data-input="genderdonorinput"]').text().trim(),
            contact: elem.find('td[data-input="contactnodonorinput"]').text().trim(),
            negativeReportOn: elem.find('td[data-input="lastnegativeinput"]').text().trim(),
            age: elem.find('td[data-input="agedonorinput"]').text().trim(),
            bloodGroup: elem.find('td[data-input="bloodgroupdonorinput"]').text().trim(),
            registeredOn: elem.find('td[data-input="registeredodonorinput"]').text().trim(),
        };

        finalData.plasma.push(plasma);
    });
});

setTimeout(() => {
    //console.log(finalData.hospitals.length);
    //console.log(finalData.oxygen.length);
    console.log(finalData.plasma);
}, 10000);

