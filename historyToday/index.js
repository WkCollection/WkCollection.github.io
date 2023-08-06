// �����任�ֲ���ʽ�ȣ����׵Ļ������Կ���� https://github.surmon.me/vue-awesome-swiper/
// ��Ȼ��Ҳ��������jquery����������Ե�, ��ֻ���ֲ�ͼ��������ЧҲ����
new Vue({
  el: "#myHistorySwiper", // el��Ҫ���������id_name��Ӧ����html: ''���div��id
  data: function () {
    return {
      swiperOption: {
        effect: "cube", // �ֲ���Ч
        loop: true, // ѭ��
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
      },
      content: [],
    };
  },
  computed: {
    swiper() {
      return this.$refs.myhistoryswiper.$swiper;
    },
  },
  created() {
    this.getHistoryList();
  },
  methods: {
    // �������ֹͣ�ֲ�
    stopAutoPlay() {
      this.swiperOption.autoplay && this.swiper.autoplay.stop();
    },
    // ����Ƴ���ʼ�ֲ�
    startAutoPlay() {
      this.swiperOption.autoplay && this.swiper.autoplay.start();
    },
    // ����Դapi, ��ȡ��ʷ�ϵĽ�������
    getHistoryList() {
      fetch("https://tenapi.cn/lishi/?format=json", {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          this.content = data.content;
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
  },
});
