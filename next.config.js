module.exports = {
  async headers() {
    return [
      {
        source: '/.well-known/apple-app-site-association',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/json',
          },
          {
            "appclips": {
                "apps": [ "863YH82QFN.com.Jibber-Inc.iOS.Clip" ]
            }
          },
        ],
      },
    ];
  },
};
