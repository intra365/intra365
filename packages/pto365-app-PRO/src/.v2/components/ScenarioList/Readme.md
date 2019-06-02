
## One column 

```js


<ScenarioList about="🍕" defaultView="toolsinonecolumn"
  
  tasks={[
       {
      "area": "Human Resources",
      "subject": "Communicate important news within the company",
      "rating": 5,
      "tools": [{"name":"Sway","ranking":5}]
    },
    {
      "area": "Human Resources",
      "subject": "Communicate important news within the company",
      "rating": 5,
      "tool": "Yammer"
    },
    {
      "area": "Manufacturing",
      "subject": "Resolve service and repair issues faster",
      "rating": 5,
      "tool": "Delve"
    },
    {
      "area": "Manufacturing",
      "subject": "Resolve service and repair issues faster",
      "rating": 5,
      "tool": "Office 365"
    }]
  }/>
```


## Ranked

```js


<ScenarioList about="🍕" 
  
  tasks={[
       {
      "area": "Human Resources",
      "subject": "Communicate important news within the company",
      "rating": 5,
      "tool": "Sway"
    },
    {
      "area": "Human Resources",
      "subject": "Communicate important news within the company",
      "rating":3,
      "tool": "Yammer"
    },
    {
      "area": "Manufacturing",
      "subject": "Resolve service and repair issues faster",
      "rating": 2,
      "tool": "Delve"
    },
    {
      "area": "Manufacturing",
      "subject": "Resolve service and repair issues faster",
      "rating": 1,
      "tool": "Office 365"
    }]
  }/>
```