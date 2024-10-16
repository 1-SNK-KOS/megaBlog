# Debugging

**Ques** : Unexpected Application Error! Objects are not valid as a React child (found: object with keys {type, className, children}). If you meant to render a collection of children, use an array instead.

**Ans** : In Button Component prop was passed but it was not handle correctly means it has to be either written props or either you destructure it but it was destructure without curly bracket.So the first parameter got everything and it was an object which react can't render implicitly we have to do it explicity either wrapping in jsx element with the object values not directly as standalone object.
As to iterate object you need first to convert it into array by :

- Using Object.entries():
This method converts an object into an array of key-value pairs, which you can then map over.

 
  ```javascript
    const obj = { a: 1, b: 2, c: 3 };
    const result = Object.entries(obj).map(([key, value]) => { return `${key}: ${value * 2}`; });
    console.log(result); // ["a: 2", "b: 4", "c: 6"]

- Using Object.keys():
This method returns an array of the object keys, which you can then map over.

   ```Javascript
    const obj = { a: 1, b: 2, c: 3 };
    const result = Object.keys(obj).map(key => {
    return `${key}: ${obj[key] * 2}`;
      });
    console.log(result); // ["a: 2", "b: 4", "c: 6"]

- Using Object.values():
If you only need the values, you can use this method.

  ```Javascript
    const obj = { a: 1, b: 2, c: 3 };
    const result = Object.values(obj).map(value => value * 2);
    console.log(result); // [2, 4, 6]

- Objects are not valid as a React child:
React components can only render certain types of children, such as:

    - Primitive types: strings, numbers, booleans (null and undefined are also allowed, but they render nothing).
    - JSX elements: Valid React components like <div>, <span>, custom components, etc.
    - Arrays of JSX elements: Arrays of valid children are also renderable.
However, objects are not valid React children by themselves. If an object is passed directly as a child, React doesn't know how to display it.


> More details :
> - https://aiarchives.org/id/E4aPuesYGCBoetYk8IxC-p
> - https://aiarchives.org/id/qFbBICAuGbcE0K3wQbEF
> - https://chatgpt.com/share/670f8d44-b5dc-800c-a08e-db7a63578010

