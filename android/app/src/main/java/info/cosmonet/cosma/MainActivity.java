package info.cosmonet.cosma;

import android.os.Bundle;
import android.view.WindowManager;
import androidx.activity.EdgeToEdge;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override public void onCreate(Bundle savedInstanceState) {
        registerPlugin(CosmaDevicePlugin.class);
        EdgeToEdge.enable(this);
        if(getSharedPreferences("cosma-device",0).getBoolean("secure",true))getWindow().addFlags(WindowManager.LayoutParams.FLAG_SECURE);
        super.onCreate(savedInstanceState);
    }
}
