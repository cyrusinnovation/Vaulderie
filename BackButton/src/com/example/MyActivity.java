package com.example;

import android.app.Activity;
import android.os.Bundle;
import android.util.Log;
import org.apache.cordova.DroidGap;
import org.apache.cordova.*;

public class MyActivity extends DroidGap
{
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        //setContentView(R.layout.main);
        super.loadUrl("file:///android_asset/www/index.html");

    }
}
