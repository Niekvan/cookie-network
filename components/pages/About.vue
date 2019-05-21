<template>
  <div class="page">
    <navbar title="The cookie network" />
    <div class="page__content">
      <div class="page__content--title">
        <p class="subtitle">
          The cookie network is an attempt to open up the opaque and closed
          infrastructure that enables companies to track us, using the cookie
          technology. This project is not an attack at the technology itself nor
          the usage for advertising. However, during my research, companies have
          tried as much as they can to keep me out of this network. If we want
          to be able to change what is going we, we first have to understand the
          current dynamics.
        </p>
      </div>
      <div class="page__content--body">
        <p class="body">
          May 25, 2018, the General Data Protection Regulations (GDPR) became
          affective. The cookie pop-ups we see now more than ever before are a
          direct result of the GDPR. However, we don't realize what happens
          after we press the button 'I accept/cosent/agree/understand'. Through
          the technology of cookies unknown entities get access to your browsing
          behaviour. Data that in itself might not be valubale, but combined
          with the data of thousands or millions of other individuals it will
          show patterns. Several examples have shown, however, that the data are
          also used for other purposes, such as influencing democratic voting
          processes. Next to this remark, it has also been shown that companies
          don’t take their security measures too serious. Resulting in data
          leaks and access to very sensitive and detailed profiles to be used by
          anyone with malicious intent.
        </p>
      </div>
      <div class="page__content--body--2">
        <p class="body">
          May 25, 2018, the General Data Protection Regulations (GDPR) became
          affective. The cookie pop-ups we see now more than ever before are a
          direct result of the GDPR. However, we don't realize what happens
          after we press the button 'I accept/cosent/agree/understand'. Through
          the technology of cookies unknown entities get access to your browsing
          behaviour. Data that in itself might not be valubale, but combined
          with the data of thousands or millions of other individuals it will
          show patterns. Several examples have shown, however, that the data are
          also used for other purposes, such as influencing democratic voting
          processes. Next to this remark, it has also been shown that companies
          don’t take their security measures too serious. Resulting in data
          leaks and access to very sensitive and detailed profiles to be used by
          anyone with malicious intent.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '~/components/Navbar.vue'
export default {
  components: {
    Navbar
  }
}
</script>

<style lang="scss" scoped>
.page {
  background: $blue;
  left: 90px;

  &__content {
    padding: $grid-spacing-top calc(#{$grid-spacing-side} + 45px) 0
      $grid-spacing-side;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: min-content 1fr;
    grid-column-gap: 3rem;

    &--title {
      grid-column: 1 / -1;
    }

    &--body {
      grid-column: 1 / 3;

      &--2 {
        grid-column: 3 / 5;
      }
    }
  }

  .subtitle {
    font-size: 2.5rem;
    font-weight: normal;
  }

  .body {
    font-size: 1.5rem;
  }
}
</style>
