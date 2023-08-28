const person = {
    name : 'Yadhi',
    address : {
        line1 : 'Baker Street',
        city : 'London',
        country : 'UK'
    },
    profiles : ['Twitter','LinkedIn', 'Instagram'],
    printProfile : () =>{
        person.profiles.map(
            (profile) =>{
                console.log(profile);
            }
        )
    }
}

export default function LearningJS(){
    return (
        <>
            <div>{person.name}</div>
            <div>{person.address.city}</div>
            <div>{person.profiles[0]}</div>
            <div> {person.printProfile()}</div>
        </>
    );
}