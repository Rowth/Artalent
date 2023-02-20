package com.artalent;


import static com.faizal.OtpVerify.AppSignatureHelper.TAG;

import android.app.Application;
import android.content.Context;
import android.util.Log;

import androidx.annotation.NonNull;

import com.arthenica.ffmpegkit.FFmpegKit;
import com.arthenica.ffmpegkit.FFmpegSession;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.io.File;

public class VideoEditorModule extends ReactContextBaseJavaModule {
    Context myContext;
    File dest;

    public VideoEditorModule(ReactApplicationContext context) {


        super(context);
        myContext = context;
    }

    @NonNull
    @Override
    public String getName() {
        return "VideoEditor";
    }

//    @ReactMethod
//    public void launchVideoEditor(String location) {
//        Log.d("VideoEditorModule", "Create event called with name: "
//                + " and location: " + location);
//
////        compressVideo(location);
//    }

    @ReactMethod
    private void compressVideo(String location, String fileName) {


        Application application = getCurrentActivity().getApplication();


        String realPath = location + "/" + fileName;


        File moviesDir = new File(application.getDataDir().getAbsolutePath() + "/cache");
        String filePrefix = "compress_video";
        String fileExtension = ".mp4";
        dest = new File(moviesDir, filePrefix + fileExtension);
        int fileNo = 0;
        while (dest.exists()) {
            fileNo++;
            dest = new File(moviesDir, filePrefix + fileNo + fileExtension);
        }

        Log.i(TAG, "yourRealPath  : " + dest.getAbsolutePath());

        String complexCommand = "-y" + " -i " + realPath + " -r" + " 25" + " -vcodec" + " mpeg4" + " -b:v" + " 150k" + " -b:a" + " 48000" + " -ac" + " 2" + " -ar" + " 22050 " + dest.getAbsolutePath();

        Log.d(TAG, "video command: " + complexCommand);

        executeComplexCommand(complexCommand);

    }

    public void executeComplexCommand(String command) {
        FFmpegSession session = FFmpegKit.execute(command);
        Log.d(TAG, "executeComplexCommand: " + session.getReturnCode());
        Log.d(TAG, "FINAL_PATH: " + dest.getAbsolutePath());

        try {

            getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit("customEventName", dest.getAbsolutePath());


        } catch (Exception e) {
            Log.e("ReactNative", "Caught Exception: " + e.getMessage());
        }


    }

}