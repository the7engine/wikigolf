const topics = [
    {title:"Citizen Kane", url:"https://en.wikipedia.org/wiki/Citizen_Kane"},
    {title:"Moon Landing", url:"https://en.wikipedia.org/wiki/Moon_landing"},
    {title:"Golf", url:"https://en.wikipedia.org/wiki/Golf"},
    {title:"Harold Holt", url:"https://en.wikipedia.org/wiki/Harold_Holt"},
    {title:"First Fleet", url:"https://en.wikipedia.org/wiki/First_Fleet"},
    {title:"Penicillin", url:"https://en.wikipedia.org/wiki/Penicillin"},
    {title:"The Rumble in the Jungle", url:"https://en.wikipedia.org/wiki/The_Rumble_in_the_Jungle"},
    {title:"Thriller (Album)", url:"https://en.wikipedia.org/wiki/Thriller_(album)"}
];
var x = Math.floor(Math.random() * topics.length);

window.onload = function(){
    document.getElementById('nameTarget').innerHTML = topics[x].title;
    document.getElementById('urlTarget').innerHTML = topics[x].url;
}
