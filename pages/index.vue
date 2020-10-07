<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">
        Banklets
      </h1>
      <div class="input">
        <label class="label-top" >BP Key:</label>
        <br/>
        <div class="input-clear">
          <input id="bpKey" type="Text"></input>
          <button class="btn-clear-input">X</button>
        </div>
        <br/>
        <button class="cta full-screen">Login</button>
      </div>

    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 400;
  font-size: 70px;
  /* color: #35495e; */
  /* color: var(--bg-color-tertiary); */
  color: #aaa;
  letter-spacing: 1px;
}

.input {
  margin-top: 80px;
}

.input-clear {
  display: flex;
  margin-top: 10px;
}

/* .label-top {
  color: var(--txt-color);
} */

#bpKey {
  /* margin-top: 10px; */
}

.cta {
  margin-top: 30px;
  padding: 5px 10px 5px 10px;
  background-color: var(--mx-dark-green);
  color: var(--mx-dark-blue);
  font-weight: 800;
  font-size: 50px;
  border: none;
  /* border: 4px solid var(--mx-dark-blue); */
  border-radius: 20px;
}

</style>
