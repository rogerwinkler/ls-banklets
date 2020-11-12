<template>
  <div class="container">
    <div class="nav">
      <Nav :title="$t('about-mx-banklets')" backlink="main" />
    </div>
    <div class="content">
      <div class="logo">
        <Logo />
        <h1 class="title">
          Banklets
        </h1>
      </div>
      <hr />
      <div class="version-date">
        <p>{{ $t("version") }}: 1.0.1 | Build: 88</p>
        <p>{{ $t("date") }}: 2020-10-13</p>
      </div>
      <div class="copyright">
        &copy; 2020 Monex AG, Balzers {{ $t("liechtenstein") }}
      </div>
      <hr />
      <div class="data-protection-header">
        {{ $t("data-protection-header") }}
      </div>
      <div class="data-protection-text">
        {{ $t("data-protection-text") }}
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.logo {
  margin-top: 30px;
  margin-bottom: 25px;
}

.version-date {
  margin-top: 25px;
}

.version-date p {
  margin-top: 20px;
  /* margin-bottom: 10px; */
}

.copyright {
  margin-top: 20px;
  margin-bottom: 25px;
}

.data-protection-header {
  margin-top: 25px;
  text-align: left;
  font-weight: 800;
  width: 80%;
  margin-left: 10%;
}

.data-protection-text {
  text-align: left;
  width: 80%;
  margin-left: 10%;
}

hr {
  width: 80%;
  margin-left: 10%;
}
</style>
