console.log("Hello World");
function mergeObjects() {
    // Initial target object
    const target = {
        name: "John",
        age: 30
    };
    
    // Source object with updated properties
    const source = {
        age: 35,
        city: "New York"
    };

    // Using Object.assign to merge source into target
    Object.assign(target, source);

    // Displaying the updated target object
    console.log(target);
}

mergeObjects();
