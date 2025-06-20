document.addEventListener('DOMContentLoaded',function(){
    const searchButton = document.getElementById('search-btn')
    const usernameInput = document.getElementById('user-input')
    const statsContainer = document.querySelector('.stat-container')

    const statsCardContainer = document.querySelector('.stats-card')
    const circleEasy = document.querySelector('.circle-easy')
    const circleMed = document.querySelector('.circle-med')
    const circleHard = document.querySelector('.circle-hard')

    let pe = document.createElement('p')
    let pm = document.createElement('p')
    let ph = document.createElement('p')

    function valiadteUsername(username){
        if(username.trim() === ""){
            alert("Username Cannot be empty")
            return false;
        }

        const regex = /^[a-zA-Z0-9_-]{1,15}$/;

        const isMatching = regex.test(username)
        if(!isMatching){
            alert("Invalid username, try removing spaces if any.");
        }

        return isMatching;
        

    }

    async function fetchUserDetails(username){

        const url = `https://leetcode-stats-api.herokuapp.com/${username}`

        searchButton.innerHTML="<p>Searching...</p>"
        searchButton.disabled = true


        return  fetch(url)
        .then(function(response){
            return response.json();
        })
        .then(function(responsedata){
            return responsedata;
        })
        .catch(function(error){
            console.log(error);
            return null;
        })

    }


    function UpdateUI(data){
        statsContainer.style.display='block'

        const easySolved = data["easySolved"]
        const medSolved = data["mediumSolved"]
        const hardSolved = data["hardSolved"]
        const ranking = data["ranking"]

        const totalEasy = data["totalEasy"]
        const totalMed = data["totalMedium"]
        const totalHard = data["totalHard"]
        const acceptaceRate = data["acceptanceRate"]
        const percentEasy = parseFloat((easySolved/totalEasy)*100);
        const percentMed = parseFloat((medSolved/totalMed)*100);
        const percentHard = parseFloat((hardSolved/totalHard)*100);

        circleEasy.style.background = `conic-gradient(pink var(--progress-degree,${percentEasy}%), rgb(224, 145, 224) 0%)`
        circleMed.style.background = `conic-gradient(pink var(--progress-degree,${percentMed}%), rgb(224, 145, 224) 0%)`
        circleHard.style.background = `conic-gradient(pink var(--progress-degree,${percentHard}%), rgb(224, 145, 224) 0%)`

        circleEasy.style.color = `#121212`
        circleMed.style.color = `#121212`    
        circleHard.style.color = `#121212`

        pe.innerText = `${easySolved}/${totalEasy}`
        pm.innerText = `${medSolved}/${totalMed}`
        ph.innerText = `${hardSolved}/${totalHard}`

        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
             circleEasy.addEventListener('touchstart',function(){
            circleEasy.appendChild(pe);
            })
            circleEasy.addEventListener('touchend',function(){
            circleEasy.removeChild(pe);
            })

            circleMed.addEventListener('touchstart',function(){
            circleMed.appendChild(pm);
            })
            circleMed.addEventListener('touchend',function(){
            circleMed.removeChild(pm);
            })

            circleHard.addEventListener('touchstart',function(){
            circleHard.appendChild(ph);
            })
            circleHard.addEventListener('touchend',function(){
            circleHard.removeChild(ph);
            })
        }
        else {
             circleEasy.addEventListener('mouseenter',function(){
            circleEasy.appendChild(pe);
            })
            circleEasy.addEventListener('mouseleave',function(){
            circleEasy.removeChild(pe);
            })

            circleMed.addEventListener('mouseenter',function(){
            circleMed.appendChild(pm);
            })
            circleMed.addEventListener('mouseleave',function(){
            circleMed.removeChild(pm);
            })

            circleHard.addEventListener('mouseenter',function(){
            circleHard.appendChild(ph);
            })
            circleHard.addEventListener('mouseleave',function(){
            circleHard.removeChild(ph);
            })
        }

        
        let div = document.createElement('div');
        div.style.padding = '10px 10px'
        div.style.fontFamily = "'Arial Narrow Bold' "
        div.style.color = "rgba(0, 0, 0, 0.756) "

        div.innerText = `World Ranking: ${ranking}
        Acceptance Rate: ${acceptaceRate}%
        `;
        statsCardContainer.appendChild(div);
        
        statsCardContainer.addEventListener('mouseenter', function(){
            statsCardContainer.style.backgroundColor = 'rgb(220, 214, 220)'
        })
        statsCardContainer.addEventListener('mouseleave', function(){
            statsCardContainer.style.backgroundColor = '#FFF1E0'
        })

    }

    

    searchButton.addEventListener('click', async function () {
    const username = usernameInput.value;
    let total 
    if (valiadteUsername(username)) {

        fetchUserDetails(username)
        .then( function(data){

        searchButton.innerHTML=`<p>Search</p>`
        searchButton.disabled = false
                        
        UpdateUI(data);

        })
    }
});
})