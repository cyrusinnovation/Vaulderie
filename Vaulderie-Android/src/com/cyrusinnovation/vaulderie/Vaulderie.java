package com.cyrusinnovation.vaulderie;

import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebResourceResponse;
import org.apache.cordova.*;
import org.apache.cordova.DroidGap;


public class Vaulderie extends DroidGap
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
