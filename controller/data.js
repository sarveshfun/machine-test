
const mysql = require('mysql2');
const connection = require('../model/model');

const get_category_master =(req, res) => {
     const results = [];
     72
    res.render("CategoryMaster.ejs", { results });
  }

function productList(request,response){
    const numberToshow = request.query.page || 1;
  const pageSize = 10;

  const offset = (numberToshow - 1) * pageSize;

  const sql = mysql.format(
    `SELECT * FROM Product_master LIMIT ${pageSize} OFFSET ${offset} `
  );
  connection.query(sql, function (err, record) {
    if (err) {
      console.log(err);
    } else {
      if (record.length === 0) {
        console.log(record);
        record = { error: "page is empty" };

        response.render("error.ejs", { record });
      } else {
        console.log(record);
        response.render("productList.ejs", { record });
        response.status(200);
      }
    }
  });
}


 const  get_product_master= (req, res) => {
    const productlist = [
     
    ];
    const categories = ["categoryName", "categoryId", "ProductId", "ProductName"];
    res.render("ProductMaster.ejs", { categories, productlist });
  }





function category_master(request,res){
  const  {categoryId,categoryName,action}  = request.body
 // console.log(request)
   switch(action){

    case  "Read":
      {
        
        const  sql = mysql.format("select  *  from  category_master  where  ? ",[{categoryId}]);

        connection.query(sql,function(err, results) {
          if(err){
              console.log(err)
          }else {
             
            res.render( 'CategoryMaster.ejs',{results})
            res.status(200)

          }

        }
      
        )
     
}

break

  case "save" :
       const sql = mysql.format('INSERT INTO category_master  SET  ? ',{categoryId,categoryName} )
 connection.query(sql,function(err, results) {
       if(err){
           console.log(err)
       }else {
            res.status(200)

       }
    }) 
break
case "update" :
        {
              const sql = mysql.format('update  category_master  SET   ?  where    ?',[{categoryName},{categoryId}])
        connection.query(sql,function(err, results) {
            if(err){
                console.log(err)
            }else {
                
                 res.status(200)
 
            }

          }
        
            

    )   
        }
        break
        case "delete" :

          {

                      

                  const  sql = mysql.format(" delete from   product_master where  ? ",[{categoryId}])
                  connection.query(sql,function(err, results) {
                    if(err){
                        console.log(err)
                    }else {           
                         res.status(200)
                         const  sql = mysql.format(" delete from   category_master where  ? ",[{categoryId}])
                         connection.query(sql,function(err, results) {
                           if(err){
                               console.log(err)
                           }else {
                             
                                res.status(200)
                
                           }
           
                         }
                       
         
                  )}


    
                  }
                
                  )
               
          }





        }}




        function product_master(request,res){
            const {search,value,categoryId,categoryName,action,ProductId,ProductName} = request.body

        switch(action){
            case  "Readcategories":
              {
                
                const  sql = mysql.format("select  *  from  Product_master  where  ?? like ? ",[search,"%"+value+'%'])
                console.log(sql)
                connection.query(sql,function(err, results) {
                  if(err){
                      console.log(err)
                  }else {
                    console.log(results)
                    const  categories = ["categoryName","categoryId","ProductId","ProductName"]
                    res.render( 'ProductMaster.ejs',{productlist:results,categories});
                   
       
                  }
      
                }
              
                )
             
        }
      break
      
          case "save" :
               const sqlnew = mysql.format('INSERT INTO Product_master  SET   ? ',{ProductId,ProductName,categoryName} );
               const sql =  `${sqlnew} , categoryId = (select categoryId from category_master  where   categoryName =  '${categoryName}') `
                 console.log(sql)
               
            connection.query(sql,function(err, results) {
               if(err){
                   console.log(err) 
               }else {
                    res.status(200)
      
               }
            }) 
      break
        case "update" :
                {
                
                      const sql = mysql.format('update  Product_master  SET   ?  where    ?',[{ProductName},{ProductId}])
                     connection.query(sql,function(err, results) {
                    if(err){
                        console.log(err)
                    }else {
                        
                         res.status(200)
         
                    }
      
                  }
                
                    
      
            )   
                }
                break
                case "delete" :
                  {
                          const  sql = mysql.format("delete from   product_master where  ? ",[{ProductId}])
                          connection.query(sql,function(err, results) {
                            if(err){
                                console.log(err)
                            }else {
                                console.log(results)
                                 res.status(200)
                 
                            }
            
                          }
                        
                          )
                       
                  }
      
      
      
       
      }}

module.exports ={
    product_master,
    category_master,
    productList,
    get_product_master,
    get_category_master

}