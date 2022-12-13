<template>
  <!-- Footer -->
  <div class="footer">
    <div class="container">
      <div class="row">
        <div class="footer-col-2">
          <!-- <img src="https://i.ibb.co/j3FNGj7/logo-white.png" alt="" /> -->
          <p>Dukaan Ethiopia</p>
          <p>
            buy and sell products from comfort of your home <br> your online shoop go live wthin a minutes
          </p>
        </div>

        <div class="footer-col-2">
          <!-- <img src="https://i.ibb.co/j3FNGj7/logo-white.png" alt="" /> -->
          <p>Address</p>
          <p>
            Motta,01 kebele, Motta city center
          </p>
        </div>

        <div class="footer-col-2">
          <!-- <img src="https://i.ibb.co/j3FNGj7/logo-white.png" alt="" /> -->
          <p>Pay With</p>
          <div class="payments">
            <img  :src="this.paypal" alt="" id="pay" />
            <img  :src="this.visa" alt="" id="pay1" />
          </div>
      


        </div>
      </div>
      <hr />
      <p class="copyright">Copyright &copy; 2022 - Dukaan Ethiopia</p>
    </div>
  </div>
</template>

<script>
 export default{
      name:"footerView",
      components:{

      },
      data(){
        return{
      images:require('@/assets/41238420_1925633487493226_888383817327312896_n.jpg'),
      paypal:require('@/assets/PP_Acceptance_Marks_for_LogoCenter_266x142.png'),
      visa:require('@/assets/visa-logo-png-transparent.png')
        }
      }
 }
</script>

<style>
#pay{
  width: 100px;
}
#pay1{
  width: 100px;
  padding-left: 20px;
}
.payments{
  display: flex;
}
 .footer{
  margin-top: 35px;
  bottom: 0;

 }

 .footer {
  background: #000;
  color: #8a8a8a;
  font-size: 14px;
  padding: 60px 0 20px;
}

.footer p {
  color: #8a8a8a;
}

.footer h3 {
  color: #ffffff;
  margin-bottom: 20px;
}

.footer-col-1,
.footer-col-2,
.footer-col-3,
.footer-col-4 {
  min-width: 250px;
  margin-bottom: 20px;
}

.footer-col-1 {
  flex-basis: 30%;
}

.footer-col-2 {
  flex: 1;
  text-align: center;
}

.footer-col-2 img {
  width: 180px;
  margin-bottom: 20px;
}

.footer-col-3,
.footer-col-4 {
  flex-basis: 12%;
  text-align: center;
}

ul {
  list-style-type: none;
}

.app-logo {
  margin-top: 20px;
}
.app-logo img {
  width: 140px;
}

.footer hr {
  border: none;
  background: #b5b5b5;
  height: 1px;
  margin: 20px 0;
}

.copyright {
  text-align: center;
}


</style>
