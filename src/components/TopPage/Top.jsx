import { useRef, useEffect, useCallback } from 'react';



export const Top = () => {
    const width = 300;
    const height = 300;
    const videoRef = useRef(null);

    async function checkImage() {
        let canvas = document.createElement("canvas");
        if (videoRef === null || videoRef.current === null) {
            return null;
        }

        const { videoWidth, videoHeight } = videoRef.current;

        canvas.width = videoWidth;
        canvas.height = videoHeight;

        const context = canvas.getContext("2d");

        if (context === null || videoRef.current === null) {
            return null;
        }

        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

        if (canvas.width === 0) {
            setTimeout(() => { checkImage() }, 200);
            return null;
        }

        const imagedata = context.getImageData(0, 0, canvas.width, canvas.height);

        const detector = new window.BarcodeDetector();

        const list = await detector.detect(imagedata, canvas.width, canvas.height);

        let cnt = 0;

        //認識できた場合、listに要素が入ります
        //(ここではバーコードの内容をアラートで表示)
        for (const detected of list) {
            cnt++;
            alert(`[${cnt}/${list.length}]${detected.rawValue}`);
        }

        setTimeout(() => { checkImage() }, 200);
    }

    useEffect(() => {
        checkImage();
    }, []);

    //カメラのstreamを取得して返すメソッド
    const getStream = useCallback(async () => {
        const aspectRatio = width / height;

        return await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: "environment",
                width: {
                    ideal: 1024
                },
                aspectRatio
            },
            audio: false
        });
    }, [width, height]);

    useEffect(() => {
        let stream = null;
        let video = videoRef.current;

        //取得したstreamをvideo要素に流す
        const setVideo = async () => {
            stream = await getStream();

            if (video === null || !stream) {
                return;
            }

            video.srcObject = stream;
            video.play();
        };

        setVideo();

        //streamを停止させる
        const cleanupVideo = () => {
            if (!stream) {
                return;
            }

            stream.getTracks().forEach((track) => track.stop());

            if (video === null) {
                return;
            }

            video.srcObject = null;
        };
        return cleanupVideo
    }, [getStream]);

    return (
        <div className="App">
            <body>
                <video ref={videoRef} playsInline width={width} height={height} />
            </body>
        </div>
    );
}