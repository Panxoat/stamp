<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      temporary
      app
    >
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>cloud_upload</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Upload</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>create_new_folder</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Folder</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="indigo lighten-1"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>{{windowSize}}</v-toolbar-title>
    </v-app-bar>

    <v-content>
    <v-row
      align="start"
      justify="center">
        <v-col md="6">
            <v-card color="#C5CAE9">
              <v-img
                  class="black--text align-end"
                  height="200px"
              >
                <v-card-title class="headline">기숙사 자치위원회 회의록</v-card-title>
            </v-img>
            </v-card>
        </v-col>
    </v-row>
    <v-row
    justify="center">
      <v-col 
      md='6'>
        <v-hover>
          <template v-slot="{ hover }">
            <v-card
              href="/"
              :elevation="hover ? 24 : 6"
              class="pa-1">
              <v-list-item>
                <v-list-item-avatar color="grey"></v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="headline">Our Changing Planet</v-list-item-title>
                  <v-list-item-subtitle>by Kurt Wagner</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>          
            </v-card>
          </template>
        </v-hover>
      </v-col>
    </v-row>
    <v-row
    justify="center">
      <v-col 
      md='6'>
        <v-hover>
          <template v-slot="{ hover }">
            <v-card
              link=""
              :elevation="hover ? 24 : 6"
              class="pa-1">
              <v-list-item>
                <v-list-item-avatar color="grey"></v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="headline">Our Changing Planet</v-list-item-title>
                  <v-list-item-subtitle>by Kurt Wagner</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>          
            </v-card>
          </template>
        </v-hover>
      </v-col>
    </v-row>
    </v-content>
    <v-footer padless absolute>
      <v-col
        class="py-2 text-center caption">
        벌점왕HS.com
        - SitSeeGSM.com 으로 자동 연결
        SitSeeGSM.com
        - CloudWatch NameServer를 통해 현재 AWS 서버 연결 예정
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    mounted () {
        this.onResize()
    },
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
      windowSize: {
          x:0,
          y:0,
      },
    }),

    methods: {
        onResize() {
            this.windowSize = { x: window.innerWidth, y: window.innerHeight}
        }
    }
  }
</script>