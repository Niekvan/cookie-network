<template>
  <div class="page">
    <navbar title="The cookie network" />
    <div class="page__content">
      <div class="page__content--title">
        <p class="subtitle header header--1">
          The cookie network is an attempt to open up the opaque and closed
          infrastructure that enables companies to track us, using the cookie
          technology. This project is not an attack at the technology itself nor
          the usage for advertising. However, during my research, companies have
          tried as much as they can to keep me out of this network. If we want
          to be able to change what is going, we first have to understand the
          current dynamics.
        </p>
      </div>
      <div class="page__content--body">
        <p class="body">
          On May 25, 2018, the General Data Protection Regulations (GDPR) became
          effective. The daily overdose of cookie pop-ups appearing on our
          computer screens is a direct result of this regulation. However, we
          hardly realize what happens when we simply press the button 'I
          accept/consent/agree/understand'. Through the technology of cookies
          unknown entities get access to your browsing behaviour. In itself the
          data that are retrieved might not be so valuable but combined with the
          data of thousands or millions of other individuals, patterns will
          become manifest. Several incidents have shown, however, that the data
          are also used for other purposes. Democratic election processes have
          been influenced through the access to personal data. Additionally, it
          has also been shown that companies don’t take their security measures
          too seriously, resulting in data leaks and access to sensitive and
          detailed profiles to be used by anyone without or with malicious
          intent.
        </p>
      </div>
      <div class="page__content--body--2">
        <p class="body">
          The cookie network is a project consisting of two elements; this
          website and a Chrome browser plugin. The plugin communicates to a
          central database. In this database all the cookies that are placed on
          your device are stored. Only you have access to these data using an
          unique cookie value. This website shows you the result of your
          browsing behaviour and let's you explore the cookie network which has
          been built up around you. The tab epxlore shows you a visual
          representation of the network. You can select websites and see through
          which channels who has access to your data and what other websites
          they use to gather more information.
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
  background: $grey-dark;
  left: 105px;
  height: 100vh;

  &__content {
    padding: $grid-spacing-top calc(#{$grid-spacing-side} + 45px) 0
      $grid-spacing-side;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: min-content 1fr;
    grid-column-gap: 6.4rem;

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
}
</style>
