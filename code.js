//deklarera variabler
const uppgifter = [];                     //tom array


const addKnapp = document.querySelector("#addListBtn");     //
const input = document.querySelector("#numbOfLists");       // input = de som skrivs i numbOfLists/runta
const ul = document.querySelector("#uppgiftLista");         //  ul = de som står i uppgiftlistan = DEN ÄR TOM I BÖRJAN
const antalKlarH2 = document.querySelector("#antalKlara");
const noTextP =document.querySelector("#noText");


//add hör grejern på knappen
addKnapp.addEventListener(
    "click",    
    textCheck
    
);

// lyssnar på hela uppgift listan
ul.addEventListener(
    "click",
    toggleKlar
);



//Skapa Function -  

function toggleKlar(event){
    const list = event.target.closest("li");        //hittar rätt <li> 
    

    if(!list){return;}
    const i = list.dataset.i;
    

    if(event.target.classList.contains("delete-btn")){
        uppgifter.splice(i, 1);         //tar bort uppgiften ur arreyen
        reFreshList();                  //refreshar så den försvinner 
        return;                         //ends här
    }

    uppgifter[i].klar = !uppgifter[i].klar;  // häm,tar objekt i arrayen via i > ändrar/vänder på KLAR VÄRDET. Så true blir false och false blir true
    
    reFreshList();

}

function textCheck(){
        let text = input.value;             //text = input > de som skrivs in i numbOfLists som TEXT eller dens "VÄRDE"
        
        

        noTextP.textContent ="";            //nollställer felmedelandet varje gång den härfunk körs

        if(text.trim() === ""){             // OM texten tom oavsett om du bara HAR en massa MELLAN SLAG.  både typ å värdet ä tomt
            noTextP.textContent = "SKRIV I NÅGOT I RUTAN! KAN INTE HA EN TOM TEXT";         //skrivs de här ut om inget är i rutan
            return;         //return vad mer finns de att säga
        }

        //skapar ett nytt objekt och lägger till den i slutet av arrayen
        uppgifter.push({
            text: text, klar: false
        });

        input.value =""; // tömmer iinput/textrutan varje gång du skrivit något i den. Så text inte stannar kvar

        //uppdaterar listan
        reFreshList();
}



function reFreshList(){

    ul.innerHTML ="";       //TÖM LISTAn

    uppgifter.forEach(function(uppgift,i){              // kollar både uppgift och i/index
        const list = document.createElement("li");             //
        list.dataset.i = i;             

        if(uppgift.klar){                               // OM uppgift är klar. Är bara ÄR DET SANT ELLER FALSKT så behövs inge ===
            list.classList.add("Klar");                 // gör så att 
        }

        //wrapern basically håller texten och soptunnan separat + banvända flex. Så jag slipper vöälja mellan punktlista eller en fin soptuna på höger sida
        const wrapper = document.createElement("div");
        wrapper.classList.add("li-wrapper");
        wrapper.textContent = uppgift.text;

        const deleteBtn = document.createElement("span");
        deleteBtn.textContent= "🗑";
        deleteBtn.classList.add("delete-btn");

        wrapper.appendChild(deleteBtn)
        list.appendChild(wrapper);    
    


        ul.appendChild(list);                           // de som står i listan skrivs ut i UPPGIFTLISTAN + lägger till LISTAN

});
    countAntalKlara();                          //anropa den så antal färdiga uppdateras
}




function countAntalKlara(){
    let antal =0;

    uppgifter.forEach(function(uppgift){
        if(uppgift.klar){
            antal++;
        }
    });

    antalKlarH2.textContent = antal;
}







