<template>
  <div class="container mx-auto">
    <!-- LAYOUT SIDEBAR LEFT -->
    <div class="layout-nav border-default-right">
      <Navbar/>
    </div>

    <!-- LAYOUT TWO COLUMN MAIN SECTION -->
    <main class="layout-main flex flex-row">


      <!-- MAIN VIEW THAT CHANGES-->
      <section class="layout-page-view border-default-right flex-auto flex flex-col items-center">
        <div class="layout-page-view__wrapper flex-1">
          <slot/>
        </div>
      </section>

      <!-- ASIDE-->
      <aside class="layout-aside sticky basis-1/3">
        <div class="tag-list">
          <p class="text-2xl mb-2 font-normal text-gray-700 dark:text-gray-400">User tags:</p>
          <ul class="">
            <li v-for="(tag, key) in tags" :key="key" class="tag-list__item"><span
                class="tag">#{{ tag.tagName }}: {{ tag.count }}</span></li>

          </ul>
        </div>


      </aside>
    </main>
  </div>
</template>

<script>
import Navbar from '@/components/sidebar/NavbarComponent';
import {getTagsInfo} from "@/api/tegit";
// import StickySidebar from 'sticky-sidebar-v2'

export default {
  name: 'MainLayout',
  components: {
    Navbar
  },
  data() {
    return {
      tags: []
    }
  },
  async mounted() {
    const {data} = await getTagsInfo()

    this.tags = data.map(item => {
      return {
        count: item.Count,
        tagName: item.Tag
      }
    })

    // new StickySidebar('.sticky', {
    //   topSpacing: 0,
    //   bottomSpacing: 0,
    //   containerSelector: '.layout-main',
    //   // innerWrapperSelector: '.sidebar__inner',
    //   // scrollContainer: '#app'
    // });
  }
}
</script>

<style scoped lang="scss">
.sticky {
  top: 10px;
  position: sticky;
}

.tag-list {
  padding: 50px 25px;

  &__item {
    margin-bottom: 25px;
  }
}

.layout-nav {
  width: 80px;
  position: fixed;
}

.layout-page-view {
  min-height: 100vh;

  &__wrapper {
    padding: 0 15px;
    width: 100%;
    max-width: 750px;
  }
}

.layout-main {
  margin-left: 80px;
  min-height: 100vh;
}
</style>
